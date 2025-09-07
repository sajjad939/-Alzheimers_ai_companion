// Logic for registration and login
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { jwtSecret, jwtExpire } = require('../config/auth');
const sendEmail = require('../utils/email');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, dateOfBirth, phoneNumber, medicalInfo } = req.body;
    
    // Check if user already exists (case-insensitive email)
    const existingUser = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        error: {
          code: 'CONFLICT_ERROR',
          message: 'User with this email already exists'
        }
      });
    }
    
    // Validate role-specific requirements
    if (role === 'patient' && !dateOfBirth) {
      return res.status(400).json({ 
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Date of birth is required for patient registration'
        }
      });
    }
    
    // Create new user
    const userData = { 
      name, 
      email, 
      password, 
      role,
      dateOfBirth,
      phoneNumber,
      medicalInfo
    };
    
    const user = new User(userData);
    
    // Hash password
    const saltRounds = 12;
    user.password = await bcrypt.hash(password, saltRounds);
    
    // Save user
    await user.save();
    
    // Generate JWT token
    const payload = { 
      id: user._id, 
      role: user.role 
    };
    
    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });
    
    res.status(201).json({ 
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      msg: 'User registered successfully'
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email (case-insensitive)
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Invalid credentials'
        }
      });
    }
    
    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({ 
        success: false,
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Account is deactivated. Please contact support.'
        }
      });
    }
    
    // Check if account is locked
    if (user.isLocked && user.lockedUntil && user.lockedUntil > Date.now()) {
      return res.status(401).json({ 
        success: false,
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Account is locked. Please try again later.'
        }
      });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Increment failed login attempts
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      
      // Lock account after 5 failed attempts
      if (user.failedLoginAttempts >= 5) {
        user.isLocked = true;
        user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
      }
      
      await user.save();
      return res.status(401).json({ 
        success: false,
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Invalid credentials'
        }
      });
    }
    
    // Reset failed login attempts
    user.failedLoginAttempts = 0;
    user.isLocked = false;
    user.lockedUntil = null;
    user.lastLogin = new Date();
    await user.save();
    
    // Generate tokens
    const payload = { 
      id: user._id, 
      role: user.role 
    };
    
    const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire || '15m' });
    
    res.status(200).json({ 
      success: true,
      data: {
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      msg: 'Login successful'
    });
  } catch (err) {
    next(err);
  }
};

exports.requestOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // Find user
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'User not found'
        }
      });
    }
    
    // Check rate limiting
    const lastOTPRequest = user.lastOTPRequest;
    if (lastOTPRequest && (Date.now() - lastOTPRequest) < 60000) { // 1 minute
      return res.status(429).json({ 
        success: false,
        error: {
          code: 'RATE_LIMIT_ERROR',
          message: 'Please wait before requesting another OTP'
        }
      });
    }
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
    
    // Hash OTP for storage
    const saltRounds = 10;
    user.otp = await bcrypt.hash(otp, saltRounds);
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.lastOTPRequest = Date.now();
    await user.save();
    
    // Send OTP via email
    try {
      await sendEmail(
        user.email, 
        'Your OTP for Login', 
        `Your OTP is: ${otp}. This OTP will expire in 10 minutes.`
      );
      res.status(200).json({ 
        success: true,
        msg: 'OTP sent to your email' 
      });
    } catch (emailError) {
      // Log the error but don't expose it to the user
      console.error('Failed to send OTP email:', emailError);
      res.status(500).json({ 
        success: false,
        error: {
          code: 'EMAIL_ERROR',
          message: 'Failed to send OTP. Please try again.'
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    
    // Find user
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'User not found'
        }
      });
    }
    
    // Check if OTP exists and is not expired
    if (!user.otp || !user.otpExpiry || user.otpExpiry < Date.now()) {
      return res.status(400).json({ 
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'OTP has expired or is invalid'
        }
      });
    }
    
    // Verify OTP
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      // Increment failed OTP attempts
      user.failedOTPAttempts = (user.failedOTPAttempts || 0) + 1;
      
      // Lock OTP verification after 5 failed attempts
      if (user.failedOTPAttempts >= 5) {
        user.otp = undefined;
        user.otpExpiry = undefined;
        user.failedOTPAttempts = 0;
        await user.save();
        return res.status(400).json({ 
          success: false,
          error: {
            code: 'AUTHENTICATION_ERROR',
            message: 'Too many failed attempts. Please request a new OTP.'
          }
        });
      }
      
      await user.save();
      return res.status(400).json({ 
        success: false,
        error: {
          code: 'AUTHENTICATION_ERROR',
          message: 'Invalid OTP'
        }
      });
    }
    
    // Clear OTP and reset failed attempts
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.failedOTPAttempts = 0;
    user.lastLogin = new Date();
    await user.save();
    
    // Generate JWT token
    const payload = { 
      id: user._id, 
      role: user.role 
    };
    
    const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire });
    
    res.status(200).json({ 
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      msg: 'OTP verification successful'
    });
  } catch (err) {
    next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    // Find user
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    if (!user) {
      return res.status(400).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'User with this email does not exist'
        }
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    
    // Send reset email
    try {
      await sendEmail(
        user.email, 
        'Password Reset Request', 
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${req.headers.origin}/reset-password/${resetToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
      );
      res.status(200).json({ 
        success: true,
        msg: 'Password reset link sent to your email' 
      });
    } catch (emailError) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      
      console.error('Failed to send password reset email:', emailError);
      res.status(500).json({ 
        success: false,
        error: {
          code: 'EMAIL_ERROR',
          message: 'Failed to send password reset email. Please try again.'
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    
    // Hash token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with valid token
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid or expired token'
        }
      });
    }
    
    // Set new password
    const saltRounds = 12;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    res.status(200).json({ 
      success: true,
      msg: 'Password reset successful' 
    });
  } catch (err) {
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'User not found'
        }
      });
    }
    
    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Current password is incorrect'
        }
      });
    }
    
    // Set new password
    const saltRounds = 12;
    user.password = await bcrypt.hash(newPassword, saltRounds);
    await user.save();
    
    res.status(200).json({ 
      success: true,
      msg: 'Password changed successfully' 
    });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'User not found'
        }
      });
    }
    
    res.status(200).json({ 
      success: true,
      data: user 
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phoneNumber, medicalInfo } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (medicalInfo) updateData.medicalInfo = medicalInfo;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'User not found'
        }
      });
    }
    
    res.status(200).json({ 
      success: true,
      data: user,
      msg: 'Profile updated successfully' 
    });
  } catch (err) {
    next(err);
  }
};

exports.getPatients = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'User not found'
        }
      });
    }
    
    // Only family members and doctors can get patients
    if (user.role !== 'family' && user.role !== 'doctor') {
      return res.status(403).json({ 
        success: false,
        error: {
          code: 'AUTHORIZATION_ERROR',
          message: 'Access denied. Only family members and doctors can access this endpoint.'
        }
      });
    }
    
    // Get patients
    const patients = await User.find({
      _id: { $in: user.patients }
    }).select('-password');
    
    res.status(200).json({ 
      success: true,
      data: patients 
    });
  } catch (err) {
    next(err);
  }
};
