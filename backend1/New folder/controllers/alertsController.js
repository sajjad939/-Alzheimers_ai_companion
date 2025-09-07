// Alert management logic
const Alert = require('../models/Alert');
const User = require('../models/User');
const { sendEmail, sendEmailTemplate } = require('../utils/email');
const { sendSMS, sendWhatsApp } = require('../utils/sms');
const logger = require('../utils/logger');

// Create alert and send notifications
exports.createAlert = async (req, res, next) => {
  try {
    const {
      message,
      type,
      reason,
      category,
      priority,
      notes,
      relatedMemory,
      actions,
      notifyEmail,
      notifyPhone,
      notifyWhatsApp,
      notifyPush
    } = req.body;
    
    // Create alert with enhanced data
    const alertData = {
      user: req.user.id,
      message,
      type,
      reason,
      category,
      priority: priority || 'medium',
      notes,
      relatedMemory,
      actions: Array.isArray(actions) ? actions : actions ? [actions] : [],
      triggeredBy: req.user.role === 'ai' ? 'ai' : 'manual'
    };
    
    const alert = new Alert(alertData);
    await alert.save();
    
    // Send notifications
    const notificationResults = [];
    
    // Send email notification
    if (notifyEmail) {
      try {
        const emailResult = await sendEmailTemplate(notifyEmail, `New Alert: ${alert.category}`, {
          text: `Alert: ${alert.message}\nReason: ${alert.reason}\nPriority: ${alert.priority}\n\nThis is an automated message from the Memory Care system.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Alert: ${alert.category}</h2>
              <p><strong>Alert:</strong> ${alert.message}</p>
              <p><strong>Reason:</strong> ${alert.reason}</p>
              <p><strong>Priority:</strong> ${alert.priority}</p>
              <hr>
              <p style="font-size: 12px; color: #666;">
                This is an automated message from the Memory Care system. Please take appropriate action.
              </p>
            </div>
          `
        });
        notificationResults.push({ method: 'email', status: 'sent', sentAt: new Date(), ...emailResult });
      } catch (err) {
        notificationResults.push({ method: 'email', status: 'failed', error: err.message });
        logger.error('Email notification failed:', { error: err.message, alertId: alert._id });
      }
    }
    
    // Send SMS notification
    if (notifyPhone) {
      try {
        const smsResult = await sendSMS(
          notifyPhone,
          `Alert: ${alert.message} - ${alert.reason} (Priority: ${alert.priority}). Please check the Memory Care app for details.`
        );
        notificationResults.push({ method: 'sms', status: 'sent', sentAt: new Date(), ...smsResult });
      } catch (err) {
        notificationResults.push({ method: 'sms', status: 'failed', error: err.message });
        logger.error('SMS notification failed:', { error: err.message, alertId: alert._id });
      }
    }
    
    // Send WhatsApp notification
    if (notifyWhatsApp) {
      try {
        const whatsappResult = await sendWhatsApp(
          notifyWhatsApp,
          `*Alert: ${alert.message}*\n\n_Reason:_ ${alert.reason}\n_Priority:_ ${alert.priority}\n\nPlease check the Memory Care app for details.`
        );
        notificationResults.push({ method: 'whatsapp', status: 'sent', sentAt: new Date(), ...whatsappResult });
      } catch (err) {
        notificationResults.push({ method: 'whatsapp', status: 'failed', error: err.message });
        logger.error('WhatsApp notification failed:', { error: err.message, alertId: alert._id });
      }
    }
    
    // Update notification history
    alert.notificationHistory = notificationResults;
    await alert.save();
    
    res.status(201).json({
      success: true,
      data: alert,
      msg: 'Alert created successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Get alerts with advanced filtering for doctors and families
exports.getAlerts = async (req, res, next) => {
  try {
    // Extract query parameters
    const {
      page = 1,
      limit = 10,
      type,
      category,
      priority,
      resolved,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      startDate,
      endDate,
      triggeredBy
    } = req.query;
    
    // Determine user role for filtering
    const user = await User.findById(req.user.id);
    
    // Build filter object
    const filter = {};
    
    // Role-based filtering
    if (user.role === 'patient') {
      // Patients only see their own alerts
      filter.user = req.user.id;
    } else if (user.role === 'family' || user.role === 'doctor') {
      // Family/Doctors see alerts for their patients
      const patientIds = user.patients || [];
      if (patientIds.length > 0) {
        filter.user = { $in: patientIds };
      } else {
        // If no patients assigned, return empty array
        return res.status(200).json({
          success: true,
          data: [],
          pagination: {
            totalPages: 0,
            currentPage: page,
            totalAlerts: 0
          }
        });
      }
    }
    
    // Apply additional filters
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (resolved !== undefined) filter.resolved = resolved === 'true';
    if (triggeredBy) filter.triggeredBy = triggeredBy;
    
    // Apply date range filter
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Execute query with pagination
    const alerts = await Alert.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name role')
      .populate('relatedMemory', 'title date')
      .exec();
    
    // Get total count for pagination
    const total = await Alert.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: alerts,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalAlerts: total
      }
    });
  } catch (err) {
    next(err);
  }
};

// Update alert with resolution tracking
exports.updateAlert = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      message,
      type,
      reason,
      category,
      priority,
      resolved,
      notes,
      actions,
      addNote
    } = req.body;
    
    // Find existing alert
    const existingAlert = await Alert.findById(id);
    if (!existingAlert) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'Alert not found'
        }
      });
    }
    
    // Check user authorization
    const user = await User.findById(req.user.id);
    let canUpdate = false;
    
    if (user.role === 'patient') {
      // Patients can only update their own alerts
      canUpdate = existingAlert.user.toString() === req.user.id;
    } else if (user.role === 'family' || user.role === 'doctor') {
      // Family/Doctors can update alerts for their patients
      const patientIds = user.patients || [];
      const alertOwner = await User.findById(existingAlert.user);
      canUpdate = patientIds.includes(existingAlert.user.toString()) || 
                  alertOwner.caregivers.includes(req.user.id);
    }
    
    if (!canUpdate) {
      return res.status(403).json({ 
        success: false,
        error: {
          code: 'AUTHORIZATION_ERROR',
          message: 'Access denied'
        }
      });
    }
    
    // Initialize update data
    const updateData = {};
    
    // Handle field updates
    if (message !== undefined) updateData.message = message;
    if (type !== undefined) updateData.type = type;
    if (reason !== undefined) updateData.reason = reason;
    if (category !== undefined) updateData.category = category;
    if (priority !== undefined) updateData.priority = priority;
    if (notes !== undefined) updateData.notes = notes;
    if (actions !== undefined) {
      updateData.actions = Array.isArray(actions) ? actions : actions ? [actions] : [];
    }
    
    // Handle resolution
    if (resolved !== undefined) {
      updateData.resolved = resolved === 'true' || resolved === true;
      if (updateData.resolved) {
        updateData.resolvedAt = new Date();
        updateData.resolvedBy = req.user.id;
      }
    }
    
    // Handle adding notes
    if (addNote) {
      updateData.notes = existingAlert.notes ? 
        existingAlert.notes + '\n' + addNote : 
        addNote;
    }
    
    // Update alert
    const alert = await Alert.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user', 'name role');
    
    if (!alert) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'Alert not found'
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: alert,
      msg: 'Alert updated successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Get alert statistics
exports.getAlertStats = async (req, res, next) => {
  try {
    // Determine user role for filtering
    const user = await User.findById(req.user.id);
    
    // Build filter object
    const filter = {};
    
    // Role-based filtering
    if (user.role === 'patient') {
      // Patients only see their own alerts
      filter.user = req.user.id;
    } else if (user.role === 'family' || user.role === 'doctor') {
      // Family/Doctors see alerts for their patients
      const patientIds = user.patients || [];
      if (patientIds.length > 0) {
        filter.user = { $in: patientIds };
      }
    }
    
    // Get statistics
    const stats = await Alert.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          resolved: { 
            $sum: { 
              $cond: [{ $eq: ["$resolved", true] }, 1, 0] 
            } 
          },
          unresolved: { 
            $sum: { 
              $cond: [{ $eq: ["$resolved", false] }, 1, 0] 
            } 
          },
          byCategory: {
            $push: "$category"
          },
          byPriority: {
            $push: "$priority"
          }
        }
      },
      {
        $project: {
          _id: 0,
          total: 1,
          resolved: 1,
          unresolved: 1,
          categories: {
            $reduce: {
              input: { $setUnion: ["$byCategory"] },
              initialValue: [],
              in: {
                $concatArrays: [
                  "$$value",
                  [{
                    category: "$$this",
                    count: {
                      $size: {
                        $filter: {
                          input: "$byCategory",
                          cond: { $eq: ["$$this", "$$value.category"] }
                        }
                      }
                    }
                  }]
                ]
              }
            }
          },
          priorities: {
            $reduce: {
              input: { $setUnion: ["$byPriority"] },
              initialValue: [],
              in: {
                $concatArrays: [
                  "$$value",
                  [{
                    priority: "$$this",
                    count: {
                      $size: {
                        $filter: {
                          input: "$byPriority",
                          cond: { $eq: ["$$this", "$$value.priority"] }
                        }
                      }
                    }
                  }]
                ]
              }
            }
          }
        }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: stats[0] || {
        total: 0,
        resolved: 0,
        unresolved: 0,
        categories: [],
        priorities: []
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get alerts for a specific patient (for doctors/family)
exports.getPatientAlerts = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    
    // Check if user is authorized to view this patient's alerts
    const user = await User.findById(req.user.id);
    if (user.role !== 'doctor' && user.role !== 'family') {
      return res.status(403).json({ 
        success: false,
        error: {
          code: 'AUTHORIZATION_ERROR',
          message: 'Access denied. Only doctors and family members can access this endpoint.'
        }
      });
    }
    
    // Check if patient exists and is associated with the user
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'Patient not found'
        }
      });
    }
    
    // Check if user is authorized to view this patient's data
    if (!patient.caregivers.includes(req.user.id) && !user.patients.includes(patientId)) {
      return res.status(403).json({ 
        success: false,
        error: {
          code: 'AUTHORIZATION_ERROR',
          message: 'Access denied. You are not authorized to view this patient\'s alerts.'
        }
      });
    }
    
    // Get alerts for the patient
    const alerts = await Alert.find({ user: patientId })
      .sort({ createdAt: -1 })
      .populate('user', 'name role')
      .populate('relatedMemory', 'title date');
    
    res.status(200).json({
      success: true,
      data: alerts
    });
  } catch (err) {
    next(err);
  }
};

// Mark multiple alerts as resolved
exports.resolveAlerts = async (req, res, next) => {
  try {
    const { alertIds } = req.body;
    
    if (!Array.isArray(alertIds) || alertIds.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'alertIds must be a non-empty array'
        }
      });
    }
    
    // Update multiple alerts
    const result = await Alert.updateMany(
      { 
        _id: { $in: alertIds },
        user: req.user.id 
      },
      { 
        resolved: true,
        resolvedAt: new Date(),
        resolvedBy: req.user.id
      }
    );
    
    res.status(200).json({
      success: true,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount
      },
      msg: `${result.modifiedCount} alerts resolved successfully`
    });
  } catch (err) {
    next(err);
  }
};
