// Nodemailer email setup and sending
const nodemailer = require('nodemailer');
const logger = require('./logger');

// Create transporter with error handling
let transporter;
try {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      logger.error('Email transporter verification failed:', error);
    } else {
      logger.info('Email transporter is ready to send messages');
    }
  });
} catch (err) {
  logger.error('Failed to create email transporter:', err);
}

const sendEmail = async (to, subject, text, html = null) => {
  try {
    // Validate inputs
    if (!to || !subject) {
      throw new Error('Recipient email and subject are required');
    }
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html
    };
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Log success
    logger.info(`Email sent successfully to ${to}`, {
      messageId: info.messageId,
      recipient: to,
      subject: subject
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    // Log error
    logger.error(`Failed to send email to ${to}`, {
      error: error.message,
      stack: error.stack,
      recipient: to,
      subject: subject
    });
    
    // Re-throw error for caller to handle
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Send email with template
const sendEmailTemplate = async (to, subject, templateData) => {
  try {
    const { text, html } = templateData;
    
    const result = await sendEmail(to, subject, text, html);
    
    return result;
  } catch (error) {
    logger.error(`Failed to send templated email to ${to}`, {
      error: error.message,
      recipient: to,
      subject: subject
    });
    
    throw error;
  }
};

// Send bulk emails
const sendBulkEmails = async (recipients, subject, text, html = null) => {
  try {
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const result = await sendEmail(recipient, subject, text, html);
        results.push({ recipient, success: true, ...result });
      } catch (error) {
        results.push({ 
          recipient, 
          success: false, 
          error: error.message 
        });
        
        // Log individual failure but continue with other recipients
        logger.warn(`Failed to send email to ${recipient}`, {
          error: error.message
        });
      }
    }
    
    // Log bulk operation summary
    const successful = results.filter(r => r.success).length;
    logger.info(`Bulk email operation completed: ${successful}/${recipients.length} successful`);
    
    return results;
  } catch (error) {
    logger.error('Failed to send bulk emails', {
      error: error.message,
      recipients: recipients.length
    });
    
    throw new Error(`Failed to send bulk emails: ${error.message}`);
  }
};

module.exports = {
  sendEmail,
  sendEmailTemplate,
  sendBulkEmails
};
