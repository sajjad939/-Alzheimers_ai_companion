const { body, check } = require('express-validator');

exports.createAlertValidation = [
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Message must be between 1 and 500 characters')
    .trim()
    .escape(),
  
  body('type')
    .isIn(['reminder', 'emergency'])
    .withMessage('Type must be either reminder or emergency'),
  
  body('reason')
    .notEmpty()
    .withMessage('Reason is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Reason must be between 1 and 200 characters')
    .trim()
    .escape(),
  
  body('category')
    .isIn(['medicine', 'appointment', 'behavior', 'emergency', 'nutrition', 'activity'])
    .withMessage('Category must be one of: medicine, appointment, behavior, emergency, nutrition, activity'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Priority must be one of: low, medium, high, critical'),
  
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes must not exceed 1000 characters')
    .trim()
    .escape(),
  
  body('actions')
    .optional()
    .isArray({ max: 5 })
    .withMessage('Actions must be an array with maximum 5 items'),
  
  check('actions.*')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Each action must not exceed 100 characters')
    .trim()
    .escape()
];

exports.updateAlertValidation = [
  body('message')
    .optional()
    .isLength({ min: 1, max: 500 })
    .withMessage('Message must be between 1 and 500 characters')
    .trim()
    .escape(),
  
  body('type')
    .optional()
    .isIn(['reminder', 'emergency'])
    .withMessage('Type must be either reminder or emergency'),
  
  body('reason')
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage('Reason must be between 1 and 200 characters')
    .trim()
    .escape(),
  
  body('category')
    .optional()
    .isIn(['medicine', 'appointment', 'behavior', 'emergency', 'nutrition', 'activity'])
    .withMessage('Category must be one of: medicine, appointment, behavior, emergency, nutrition, activity'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Priority must be one of: low, medium, high, critical'),
  
  body('resolved')
    .optional()
    .isBoolean()
    .withMessage('Resolved must be a boolean value'),
  
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes must not exceed 1000 characters')
    .trim()
    .escape(),
  
  body('actions')
    .optional()
    .isArray({ max: 5 })
    .withMessage('Actions must be an array with maximum 5 items'),
  
  check('actions.*')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Each action must not exceed 100 characters')
    .trim()
    .escape()
];