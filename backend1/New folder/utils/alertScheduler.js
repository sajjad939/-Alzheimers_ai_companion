// Utility for scheduling and triggering alerts based on AI logic
const cron = require('node-cron');
const Alert = require('../models/Alert');
const User = require('../models/User');
const Memory = require('../models/Memory');
const { sendEmail, sendEmailTemplate } = require('./email');
const { sendSMS, sendWhatsApp } = require('./sms');
const logger = require('./logger');

// Schedule to run every hour
const scheduleAlerts = () => {
  // Run every hour at minute 0
  cron.schedule('0 * * * *', async () => {
    logger.info('Running scheduled alert check...');
    try {
      await checkForMissedMedications();
      await checkForBehavioralChanges();
      await checkForSymptoms();
    } catch (err) {
      logger.error('Error in scheduled alert check:', err);
    }
  });
};

// Check for missed medications
const checkForMissedMedications = async () => {
  try {
    // Find all patients
    const patients = await User.find({ role: 'patient' });
    
    for (const patient of patients) {
      // Check if patient has medication info
      if (patient.medicalInfo && patient.medicalInfo.medications) {
        for (const medication of patient.medicalInfo.medications) {
          // Check if medication has a schedule
          if (medication.schedule) {
            // This is a simplified check - in a real implementation,
            // you would check against the actual schedule and last taken time
            const lastTaken = medication.lastTaken || new Date(0);
            const now = new Date();
            const hoursSinceLastTaken = (now - lastTaken) / (1000 * 60 * 60);
            
            // If more than the scheduled interval has passed, create an alert
            if (hoursSinceLastTaken > 24) { // Simplified check for daily meds
              const alert = new Alert({
                user: patient._id,
                message: `Missed medication: ${medication.name}`,
                type: 'reminder',
                reason: 'Missed scheduled medication',
                category: 'medicine',
                priority: 'high',
                detectedIssue: 'Patient has not taken their medication in over 24 hours',
                triggeredBy: 'ai'
              });
              
              await alert.save();
              
              // Send notifications to caregivers
              await notifyCaregivers(patient, alert);
            }
          }
        }
      }
    }
  } catch (err) {
    logger.error('Error checking for missed medications:', err);
  }
};

// Check for behavioral changes based on memory patterns
const checkForBehavioralChanges = async () => {
  try {
    // Find all patients
    const patients = await User.find({ role: 'patient' });
    
    for (const patient of patients) {
      // Get recent memories (last 7 days)
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const recentMemories = await Memory.find({
        user: patient._id,
        createdAt: { $gte: oneWeekAgo }
      });
      
      // Check for patterns indicating confusion or behavioral changes
      if (recentMemories.length < 3) { // Less than 3 memories in a week might indicate reduced activity
        const alert = new Alert({
          user: patient._id,
          message: 'Reduced activity detected',
          type: 'reminder',
          reason: 'Patient activity level has decreased',
          category: 'behavior',
          priority: 'medium',
          detectedIssue: 'Patient has created fewer than 3 memories in the past week',
          triggeredBy: 'ai'
        });
        
        await alert.save();
        
        // Send notifications to caregivers
        await notifyCaregivers(patient, alert);
      }
      
      // Check for repetitive content (possible memory issues)
      const memoryContents = recentMemories.map(mem => mem.title + mem.description);
      const uniqueContents = new Set(memoryContents);
      
      if (memoryContents.length > 0 && uniqueContents.size / memoryContents.length < 0.5) {
        // More than 50% repetition
        const alert = new Alert({
          user: patient._id,
          message: 'Repetitive content detected',
          type: 'reminder',
          reason: 'Possible memory issues detected',
          category: 'behavior',
          priority: 'high',
          detectedIssue: 'Patient is creating memories with repetitive content',
          triggeredBy: 'ai'
        });
        
        await alert.save();
        
        // Send notifications to caregivers
        await notifyCaregivers(patient, alert);
      }
    }
  } catch (err) {
    logger.error('Error checking for behavioral changes:', err);
  }
};

// Check for symptoms based on memory content
const checkForSymptoms = async () => {
  try {
    // Find all patients
    const patients = await User.find({ role: 'patient' });
    
    for (const patient of patients) {
      // Get recent memories (last 3 days)
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      
      const recentMemories = await Memory.find({
        user: patient._id,
        createdAt: { $gte: threeDaysAgo }
      });
      
      // Check for keywords indicating symptoms
      const symptomKeywords = [
        'pain', 'hurt', 'sore', 'ache', 'tired', 'fatigue',
        'confused', 'lost', 'forget', 'scared', 'worried'
      ];
      
      let symptomCount = 0;
      for (const memory of recentMemories) {
        const content = (memory.title + ' ' + memory.description).toLowerCase();
        for (const keyword of symptomKeywords) {
          if (content.includes(keyword)) {
            symptomCount++;
          }
        }
      }
      
      // If more than 2 symptom keywords found, create an alert
      if (symptomCount > 2) {
        const alert = new Alert({
          user: patient._id,
          message: 'Possible symptoms detected',
          type: 'reminder',
          reason: 'Multiple symptom indicators found in recent memories',
          category: 'symptoms',
          priority: 'high',
          detectedIssue: `Patient mentioned ${symptomCount} potential symptoms in recent memories`,
          triggeredBy: 'ai'
        });
        
        await alert.save();
        
        // Send notifications to caregivers
        await notifyCaregivers(patient, alert);
      }
    }
  } catch (err) {
    logger.error('Error checking for symptoms:', err);
  }
};

// Notify caregivers about alerts
const notifyCaregivers = async (patient, alert) => {
  try {
    // Get caregivers
    const caregivers = await User.find({
      _id: { $in: patient.caregivers }
    });
    
    for (const caregiver of caregivers) {
      // Send email notification
      if (caregiver.email) {
        try {
          const emailResult = await sendEmailTemplate(caregiver.email, `Alert for ${patient.name}: ${alert.message}`, {
            text: `An alert has been generated for ${patient.name}:\n\n${alert.message}\n\nReason: ${alert.reason}\nPriority: ${alert.priority}\n\nPlease check on the patient.`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Alert for ${patient.name}</h2>
                <p><strong>Alert:</strong> ${alert.message}</p>
                <p><strong>Reason:</strong> ${alert.reason}</p>
                <p><strong>Priority:</strong> ${alert.priority}</p>
                <p><strong>Detected Issue:</strong> ${alert.detectedIssue}</p>
                <hr>
                <p style="font-size: 12px; color: #666;">
                  This is an automated alert from the Memory Care system. Please check on the patient as soon as possible.
                </p>
              </div>
            `
          });
          logger.info(`Email sent to caregiver ${caregiver.email}`, { messageId: emailResult.messageId });
        } catch (err) {
          logger.error(`Failed to send email to ${caregiver.email}:`, err);
        }
      }
      
      // Send SMS notification
      if (caregiver.phoneNumber) {
        try {
          const smsResult = await sendSMS(
            caregiver.phoneNumber,
            `Alert for ${patient.name}: ${alert.message} - ${alert.reason} (Priority: ${alert.priority})`
          );
          logger.info(`SMS sent to caregiver ${caregiver.phoneNumber}`, { sid: smsResult.sid });
        } catch (err) {
          logger.error(`Failed to send SMS to ${caregiver.phoneNumber}:`, err);
        }
      }
      
      // Send WhatsApp notification (if available)
      if (caregiver.whatsappNumber) {
        try {
          const whatsappResult = await sendWhatsApp(
            caregiver.whatsappNumber,
            `*Alert for ${patient.name}*\n\n_Alert:_ ${alert.message}\n_Reason:_ ${alert.reason}\n_Priority:_ ${alert.priority}\n\nPlease check on the patient.`
          );
          logger.info(`WhatsApp message sent to caregiver ${caregiver.whatsappNumber}`, { sid: whatsappResult.sid });
        } catch (err) {
          logger.error(`Failed to send WhatsApp message to ${caregiver.whatsappNumber}:`, err);
        }
      }
    }
  } catch (err) {
    logger.error('Error notifying caregivers:', err);
  }
};

module.exports = {
  scheduleAlerts,
  checkForMissedMedications,
  checkForBehavioralChanges,
  checkForSymptoms
};