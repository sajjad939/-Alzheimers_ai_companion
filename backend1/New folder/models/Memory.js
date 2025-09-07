// Memory schema
const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['photo', 'voice', 'text', 'event', 'milestone'], required: true },
  date: { type: Date, default: Date.now },
  location: { type: String },
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: false },
  mood: { type: String, enum: ['happy', 'sad', 'nostalgic', 'confused', 'calm'] },
  participants: [{ type: String }],
  contentType: { type: String, enum: ['photo', 'voice', 'text'] },
  contentReferences: {
    photoPath: { type: String },
    voicePath: { type: String },
    textContent: { type: String }
  },
  metadata: {
    fileSize: { type: Number },
    duration: { type: Number }, // for voice recordings
    dimensions: {
      width: { type: Number },
      height: { type: Number }
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Memory', MemorySchema);
