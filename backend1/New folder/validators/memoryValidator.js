const { body, check } = require('express-validator');

exports.createMemoryValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters')
    .trim()
    .escape(),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .trim()
    .escape(),
  
  body('type')
    .isIn(['photo', 'voice', 'text', 'event', 'milestone'])
    .withMessage('Type must be one of: photo, voice, text, event, milestone'),
  
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid date'),
  
  body('location')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters')
    .trim()
    .escape(),
  
  body('tags')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Tags must be an array with maximum 10 items'),
  
  check('tags.*')
    .optional()
    .isLength({ max: 30 })
    .withMessage('Each tag must not exceed 30 characters')
    .trim()
    .escape(),
  
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean value'),
  
  body('mood')
    .optional()
    .isIn(['happy', 'sad', 'nostalgic', 'confused', 'calm'])
    .withMessage('Mood must be one of: happy, sad, nostalgic, confused, calm'),
  
  body('participants')
    .optional()
    .isArray({ max: 20 })
    .withMessage('Participants must be an array with maximum 20 items'),
  
  check('participants.*')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Each participant name must not exceed 50 characters')
    .trim()
    .escape()
];

exports.updateMemoryValidation = [
  body('title')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters')
    .trim()
    .escape(),
  
  body('description')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .trim()
    .escape(),
  
  body('type')
    .optional()
    .isIn(['photo', 'voice', 'text', 'event', 'milestone'])
    .withMessage('Type must be one of: photo, voice, text, event, milestone'),
  
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid date'),
  
  body('location')
    .optional()
    .isLength({ max: 100 })
    .withMessage('Location must not exceed 100 characters')
    .trim()
    .escape(),
  
  body('tags')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Tags must be an array with maximum 10 items'),
  
  check('tags.*')
    .optional()
    .isLength({ max: 30 })
    .withMessage('Each tag must not exceed 30 characters')
    .trim()
    .escape(),
  
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean value'),
  
  body('mood')
    .optional()
    .isIn(['happy', 'sad', 'nostalgic', 'confused', 'calm'])
    .withMessage('Mood must be one of: happy, sad, nostalgic, confused, calm'),
  
  body('participants')
    .optional()
    .isArray({ max: 20 })
    .withMessage('Participants must be an array with maximum 20 items'),
  
  check('participants.*')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Each participant name must not exceed 50 characters')
    .trim()
    .escape()
];