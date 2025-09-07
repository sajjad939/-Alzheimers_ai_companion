// Routes for alert creation and retrieval
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const alertsController = require('../controllers/alertsController');
const { createAlertValidation, updateAlertValidation } = require('../validators/alertValidator');
const validate = require('../middlewares/validateInput');

// Create alert (send notifications)
router.post('/', auth, createAlertValidation, validate, alertsController.createAlert);

// Get alerts (optionally filter by type or sent status)
// Example: /api/alerts?type=reminder&sent=true
router.get('/', auth, alertsController.getAlerts);

// Update alert (e.g., mark as sent)
router.put('/:id', auth, updateAlertValidation, validate, alertsController.updateAlert);

// Get alert statistics
router.get('/stats', auth, alertsController.getAlertStats);

// Get alerts for a specific patient (for doctors/family)
router.get('/patient/:patientId', auth, alertsController.getPatientAlerts);

// Mark multiple alerts as resolved
router.post('/resolve', auth, alertsController.resolveAlerts);

module.exports = router;
