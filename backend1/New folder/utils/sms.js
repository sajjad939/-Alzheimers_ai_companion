// Twilio setup for SMS/WhatsApp
const twilio = require('twilio');
const logger = require('./logger');

// Create Twilio client with error handling
let client;
try {
  client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  logger.info('Twilio client initialized successfully');
} catch (err) {
  logger.error('Failed to initialize Twilio client:', err);
}

const sendSMS = async (to, body) => {
  try {
    // Validate inputs
    if (!to || !body) {
      throw new Error('Recipient phone number and message body are required');
    }
    
    // Send SMS
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE,
      to,
    });
    
    // Log success
    logger.info(`SMS sent successfully to ${to}`, {
      sid: message.sid,
      recipient: to,
      body: body.substring(0, 50) + (body.length > 50 ? '...' : '')
    });
    
    return { success: true, sid: message.sid };
  } catch (error) {
    // Log error
    logger.error(`Failed to send SMS to ${to}`, {
      error: error.message,
      stack: error.stack,
      recipient: to,
      body: body ? body.substring(0, 50) + (body.length > 50 ? '...' : '') : ''
    });
    
    // Re-throw error for caller to handle
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
};

// Send WhatsApp message
const sendWhatsApp = async (to, body) => {
  try {
    // Validate inputs
    if (!to || !body) {
      throw new Error('Recipient phone number and message body are required');
    }
    
    // Format WhatsApp number (add whatsapp: prefix)
    const whatsappTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`;
    
    // Send WhatsApp message
    const message = await client.messages.create({
      body,
      from: `whatsapp:${process.env.TWILIO_PHONE}`,
      to: whatsappTo,
    });
    
    // Log success
    logger.info(`WhatsApp message sent successfully to ${whatsappTo}`, {
      sid: message.sid,
      recipient: whatsappTo,
      body: body.substring(0, 50) + (body.length > 50 ? '...' : '')
    });
    
    return { success: true, sid: message.sid };
  } catch (error) {
    // Log error
    logger.error(`Failed to send WhatsApp message to ${to}`, {
      error: error.message,
      stack: error.stack,
      recipient: to,
      body: body ? body.substring(0, 50) + (body.length > 50 ? '...' : '') : ''
    });
    
    // Re-throw error for caller to handle
    throw new Error(`Failed to send WhatsApp message: ${error.message}`);
  }
};

// Send bulk SMS messages
const sendBulkSMS = async (recipients, body) => {
  try {
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const result = await sendSMS(recipient, body);
        results.push({ recipient, success: true, ...result });
      } catch (error) {
        results.push({ 
          recipient, 
          success: false, 
          error: error.message 
        });
        
        // Log individual failure but continue with other recipients
        logger.warn(`Failed to send SMS to ${recipient}`, {
          error: error.message
        });
      }
    }
    
    // Log bulk operation summary
    const successful = results.filter(r => r.success).length;
    logger.info(`Bulk SMS operation completed: ${successful}/${recipients.length} successful`);
    
    return results;
  } catch (error) {
    logger.error('Failed to send bulk SMS messages', {
      error: error.message,
      recipients: recipients.length
    });
    
    throw new Error(`Failed to send bulk SMS messages: ${error.message}`);
  }
};

module.exports = {
  sendSMS,
  sendWhatsApp,
  sendBulkSMS
};
