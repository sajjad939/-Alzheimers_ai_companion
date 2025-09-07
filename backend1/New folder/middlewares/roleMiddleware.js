// Role-based authorization middleware
const User = require('../models/User');
const { AuthorizationError } = require('./errorHandler');

// Check if user has specific role(s)
const requireRole = (...roles) => {
  return async (req, res, next) => {
    try {
      // Get user from database to check current role
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return next(new AuthorizationError('User not found'));
      }
      
      // Check if user role is in allowed roles
      if (!roles.includes(user.role)) {
        return next(new AuthorizationError(`Access denied. Required role(s): ${roles.join(', ')}`));
      }
      
      // Add user to request object
      req.user = user;
      next();
    } catch (err) {
      next(new AuthorizationError('Access denied'));
    }
  };
};

// Check if user is a patient
const requirePatient = requireRole('patient');

// Check if user is a family member or doctor
const requireCaregiver = requireRole('family', 'doctor');

// Check if user is a doctor
const requireDoctor = requireRole('doctor');

// Check if user is authorized to access patient data
const requirePatientAccess = () => {
  return async (req, res, next) => {
    try {
      // Get user from database
      const user = await User.findById(req.user.id);
      
      if (!user) {
        return next(new AuthorizationError('User not found'));
      }
      
      // If user is a patient, they can access their own data
      if (user.role === 'patient') {
        req.user = user;
        return next();
      }
      
      // If user is a family member or doctor, check if they have access to the patient
      if (user.role === 'family' || user.role === 'doctor') {
        // Get patient ID from request parameters or body
        const patientId = req.params.patientId || req.body.patientId || req.query.patientId;
        
        if (!patientId) {
          return next(new AuthorizationError('Patient ID is required'));
        }
        
        // Check if user has access to this patient
        if (!user.patients || !user.patients.includes(patientId)) {
          // Also check if patient has this user as a caregiver
          const patient = await User.findById(patientId);
          if (!patient || !patient.caregivers || !patient.caregivers.includes(user._id)) {
            return next(new AuthorizationError('Access denied to this patient\'s data'));
          }
        }
        
        req.user = user;
        return next();
      }
      
      return next(new AuthorizationError('Access denied'));
    } catch (err) {
      next(new AuthorizationError('Access denied'));
    }
  };
};

module.exports = {
  requireRole,
  requirePatient,
  requireCaregiver,
  requireDoctor,
  requirePatientAccess
};