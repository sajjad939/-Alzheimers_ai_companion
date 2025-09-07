// Routes for auth (login, register)
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  register,
  login,
  requestOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
  changePassword,
  getProfile,
  updateProfile,
  getPatients
} = require('../controllers/authController');
const {
  registerValidation,
  loginValidation,
  otpRequestValidation,
  otpVerifyValidation
} = require('../validators/authValidator');
const validate = require('../middlewares/validateInput');

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/request-otp', otpRequestValidation, validate, requestOTP);
router.post('/verify-otp', otpVerifyValidation, validate, verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/change-password', auth, changePassword);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/patients', auth, getPatients);

module.exports = router;
