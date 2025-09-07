// User schema (patients, family, doctors)
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'family', 'doctor'], required: true },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  dateOfBirth: { type: Date },
  medicalInfo: {
    conditions: [{ type: String }],
    medications: [{
      name: { type: String },
      dosage: { type: String },
      schedule: { type: String }
    }],
    allergies: [{ type: String }],
    emergencyContact: {
      name: { type: String },
      phone: { type: String }
    }
  },
  caregivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  cognitiveStage: { type: String, enum: ['early', 'middle', 'late'] },
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  specialization: { type: String },
  phoneNumber: { type: String },
  address: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
