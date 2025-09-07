// Alert schema
const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['reminder', 'emergency'], required: true },
  sent: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
  reason: { type: String, required: true },
  detectedIssue: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  category: { type: String, enum: ['medicine', 'appointment', 'behavior', 'emergency', 'nutrition', 'activity'], required: true },
  triggeredBy: { type: String, enum: ['ai', 'manual', 'scheduled'], default: 'manual' },
  resolved: { type: Boolean, default: false },
  resolvedAt: { type: Date },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String },
  relatedMemory: { type: mongoose.Schema.Types.ObjectId, ref: 'Memory' },
  actions: [{ type: String }],
  notificationHistory: [{
    method: { type: String, enum: ['email', 'sms', 'push'] },
    sentAt: { type: Date },
    status: { type: String, enum: ['sent', 'failed', 'pending'] }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Alert', AlertSchema);
