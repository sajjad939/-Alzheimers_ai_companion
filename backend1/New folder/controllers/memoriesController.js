// CRUD operations for memories
const Memory = require('../models/Memory');
const User = require('../models/User');
const path = require('path');
const fs = require('fs').promises;

// Create memory with file upload support
exports.createMemory = async (req, res, next) => {
  try {
    const {
      title,
      description,
      type,
      date,
      location,
      tags,
      isPublic,
      mood,
      participants
    } = req.body;
    
    // Initialize memory data object
    const memoryData = {
      user: req.user.id,
      title,
      description,
      type,
      date: date ? new Date(date) : new Date(),
      location,
      tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
      isPublic: isPublic === 'true' || isPublic === true,
      mood,
      participants: Array.isArray(participants) ? participants : participants ? [participants] : []
    };
    
    // Handle file uploads with metadata extraction
    if (req.files) {
      // Process photo upload
      if (req.files.photo && req.files.photo[0]) {
        const photoFile = req.files.photo[0];
        
        // Validate file size (max 10MB)
        if (photoFile.size > 10 * 1024 * 1024) {
          return res.status(400).json({ 
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Photo file size exceeds 10MB limit'
            }
          });
        }
        
        // Set content type and reference
        memoryData.contentType = 'photo';
        memoryData.contentReferences = memoryData.contentReferences || {};
        memoryData.contentReferences.photoPath = path.join('uploads/photos', photoFile.filename);
        
        // Extract photo metadata
        memoryData.metadata = memoryData.metadata || {};
        memoryData.metadata.fileSize = photoFile.size;
        
        // Try to extract image dimensions (requires additional library like sharp)
        try {
          // This would require installing sharp: const sharp = require('sharp');
          // const image = await sharp(photoFile.path).metadata();
          // memoryData.metadata.dimensions = { width: image.width, height: image.height };
        } catch (err) {
          // Log error but don't fail the request
          console.warn('Could not extract image dimensions:', err.message);
        }
      }
      
      // Process voice upload
      if (req.files.voice && req.files.voice[0]) {
        const voiceFile = req.files.voice[0];
        
        // Validate file size (max 30MB)
        if (voiceFile.size > 30 * 1024 * 1024) {
          return res.status(400).json({ 
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Voice file size exceeds 30MB limit'
            }
          });
        }
        
        // Set content type and reference
        memoryData.contentType = memoryData.contentType || 'voice';
        memoryData.contentReferences = memoryData.contentReferences || {};
        memoryData.contentReferences.voicePath = path.join('uploads/voice', voiceFile.filename);
        
        // Extract voice metadata
        memoryData.metadata = memoryData.metadata || {};
        memoryData.metadata.fileSize = voiceFile.size;
        
        // Try to extract duration (requires additional library like ffmpeg)
        try {
          // This would require installing ffmpeg: const ffmpeg = require('fluent-ffmpeg');
          // const duration = await getAudioDuration(voiceFile.path);
          // memoryData.metadata.duration = duration;
        } catch (err) {
          // Log error but don't fail the request
          console.warn('Could not extract audio duration:', err.message);
        }
      }
    }
    
    // Handle text content
    if (!req.files || (!req.files.photo && !req.files.voice)) {
      memoryData.contentType = 'text';
      memoryData.contentReferences = memoryData.contentReferences || {};
      memoryData.contentReferences.textContent = description;
    }
    
    // Check for duplicate memories (same title and date within 24 hours)
    const existingMemory = await Memory.findOne({
      user: req.user.id,
      title: title,
      date: {
        $gte: new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000),
        $lte: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
      }
    });
    
    if (existingMemory) {
      return res.status(409).json({ 
        success: false,
        error: {
          code: 'CONFLICT_ERROR',
          message: 'A similar memory already exists for this time period'
        }
      });
    }
    
    // Create and save memory
    const memory = new Memory(memoryData);
    await memory.save();
    
    res.status(201).json({
      success: true,
      data: memory,
      msg: 'Memory created successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Get memories with advanced filtering and pagination
exports.getMemories = async (req, res, next) => {
  try {
    // Extract query parameters
    const {
      page = 1,
      limit = 10,
      type,
      tags,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      isPublic
    } = req.query;
    
    // Build filter object
    const filter = { user: req.user.id };
    
    // Apply type filter
    if (type) {
      filter.type = type;
    }
    
    // Apply tags filter
    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : tags.split(',');
      filter.tags = { $in: tagsArray };
    }
    
    // Apply date range filter
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }
    
    // Apply public filter
    if (isPublic !== undefined) {
      filter.isPublic = isPublic === 'true';
    }
    
    // Apply search filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    // Execute query with pagination
    const memories = await Memory.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    // Get total count for pagination
    const total = await Memory.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      data: memories,
      pagination: {
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        totalMemories: total
      }
    });
  } catch (err) {
    next(err);
  }
};

// Get a single memory by ID with access control
exports.getMemoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find memory with populated user data (for shared memories)
    const memory = await Memory.findById(id)
      .populate('user', 'name role');
    
    if (!memory) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'Memory not found'
        }
      });
    }
    
    // Check if user has access to this memory
    if (memory.user._id.toString() !== req.user.id && !memory.isPublic) {
      // Check if user is a caregiver for the memory owner (if patient)
      const user = await User.findById(req.user.id);
      if (user.role !== 'doctor' && user.role !== 'family') {
        return res.status(403).json({ 
          success: false,
          error: {
            code: 'AUTHORIZATION_ERROR',
            message: 'Access denied'
          }
        });
      }
      
      // Check if user is authorized to view this patient's memories
      const memoryOwner = await User.findById(memory.user._id);
      if (!memoryOwner.caregivers.includes(req.user.id)) {
        return res.status(403).json({ 
          success: false,
          error: {
            code: 'AUTHORIZATION_ERROR',
            message: 'Access denied'
          }
        });
      }
    }
    
    res.status(200).json({
      success: true,
      data: memory
    });
  } catch (err) {
    next(err);
  }
};

// Update memory with partial updates and file handling
exports.updateMemory = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find existing memory
    const existingMemory = await Memory.findOne({
      _id: id,
      user: req.user.id
    });
    
    if (!existingMemory) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'Memory not found'
        }
      });
    }
    
    // Initialize update data
    const updateData = {};
    
    // Handle text fields
    const {
      title,
      description,
      type,
      date,
      location,
      tags,
      isPublic,
      mood,
      participants
    } = req.body;
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (date !== undefined) updateData.date = new Date(date);
    if (location !== undefined) updateData.location = location;
    if (tags !== undefined) {
      updateData.tags = Array.isArray(tags) ? tags : tags ? [tags] : [];
    }
    if (isPublic !== undefined) {
      updateData.isPublic = isPublic === 'true' || isPublic === true;
    }
    if (mood !== undefined) updateData.mood = mood;
    if (participants !== undefined) {
      updateData.participants = Array.isArray(participants) ? participants : participants ? [participants] : [];
    }
    
    // Handle file updates
    if (req.files) {
      // Process photo update
      if (req.files.photo && req.files.photo[0]) {
        const photoFile = req.files.photo[0];
        
        // Validate file size
        if (photoFile.size > 10 * 1024 * 1024) {
          return res.status(400).json({ 
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Photo file size exceeds 10MB limit'
            }
          });
        }
        
        // Remove old photo file if exists
        if (existingMemory.contentReferences && existingMemory.contentReferences.photoPath) {
          try {
            const oldFilePath = path.join(__dirname, '..', existingMemory.contentReferences.photoPath);
            await fs.unlink(oldFilePath);
          } catch (err) {
            console.warn('Could not delete old photo file:', err.message);
          }
        }
        
        // Update content type and reference
        updateData.contentType = 'photo';
        updateData.contentReferences = updateData.contentReferences || {};
        updateData.contentReferences.photoPath = path.join('uploads/photos', photoFile.filename);
        
        // Extract photo metadata
        updateData.metadata = updateData.metadata || {};
        updateData.metadata.fileSize = photoFile.size;
        
        try {
          // This would require installing sharp: const sharp = require('sharp');
          // const image = await sharp(photoFile.path).metadata();
          // updateData.metadata.dimensions = { width: image.width, height: image.height };
        } catch (err) {
          console.warn('Could not extract image dimensions:', err.message);
        }
      }
      
      // Process voice update
      if (req.files.voice && req.files.voice[0]) {
        const voiceFile = req.files.voice[0];
        
        // Validate file size
        if (voiceFile.size > 30 * 1024 * 1024) {
          return res.status(400).json({ 
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Voice file size exceeds 30MB limit'
            }
          });
        }
        
        // Remove old voice file if exists
        if (existingMemory.contentReferences && existingMemory.contentReferences.voicePath) {
          try {
            const oldFilePath = path.join(__dirname, '..', existingMemory.contentReferences.voicePath);
            await fs.unlink(oldFilePath);
          } catch (err) {
            console.warn('Could not delete old voice file:', err.message);
          }
        }
        
        // Update content type and reference
        updateData.contentType = updateData.contentType || 'voice';
        updateData.contentReferences = updateData.contentReferences || {};
        updateData.contentReferences.voicePath = path.join('uploads/voice', voiceFile.filename);
        
        // Extract voice metadata
        updateData.metadata = updateData.metadata || {};
        updateData.metadata.fileSize = voiceFile.size;
        
        try {
          // This would require installing ffmpeg: const ffmpeg = require('fluent-ffmpeg');
          // const duration = await getAudioDuration(voiceFile.path);
          // updateData.metadata.duration = duration;
        } catch (err) {
          console.warn('Could not extract audio duration:', err.message);
        }
      }
    }
    
    // Update memory
    const memory = await Memory.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!memory) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'Memory not found'
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: memory,
      msg: 'Memory updated successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Delete memory with file cleanup
exports.deleteMemory = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find memory
    const memory = await Memory.findOne({
      _id: id,
      user: req.user.id
    });
    
    if (!memory) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'Memory not found'
        }
      });
    }
    
    // Remove associated files
    if (memory.contentReferences) {
      if (memory.contentReferences.photoPath) {
        try {
          const photoPath = path.join(__dirname, '..', memory.contentReferences.photoPath);
          await fs.unlink(photoPath);
        } catch (err) {
          console.warn('Could not delete photo file:', err.message);
        }
      }
      
      if (memory.contentReferences.voicePath) {
        try {
          const voicePath = path.join(__dirname, '..', memory.contentReferences.voicePath);
          await fs.unlink(voicePath);
        } catch (err) {
          console.warn('Could not delete voice file:', err.message);
        }
      }
    }
    
    // Delete memory from database
    await Memory.findOneAndDelete({ _id: id, user: req.user.id });
    
    res.status(200).json({ 
      success: true,
      msg: 'Memory deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Get memory timeline view
exports.getMemoryTimeline = async (req, res, next) => {
  try {
    const { year, month } = req.query;
    
    // Build date filter
    const filter = { user: req.user.id };
    
    if (year) {
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
      filter.date = { $gte: startOfYear, $lte: endOfYear };
    }
    
    if (month && year) {
      const startOfMonth = new Date(year, month - 1, 1);
      const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);
      filter.date = { $gte: startOfMonth, $lte: endOfMonth };
    }
    
    // Group memories by date
    const memories = await Memory.find(filter)
      .sort({ date: 1 })
      .select('title date type mood');
    
    // Group by date
    const timeline = {};
    memories.forEach(memory => {
      const dateKey = memory.date.toISOString().split('T')[0];
      if (!timeline[dateKey]) {
        timeline[dateKey] = [];
      }
      timeline[dateKey].push({
        id: memory._id,
        title: memory.title,
        type: memory.type,
        mood: memory.mood
      });
    });
    
    res.status(200).json({
      success: true,
      data: {
        timeline,
        year: year || new Date().getFullYear(),
        month: month || new Date().getMonth() + 1
      }
    });
  } catch (err) {
    next(err);
  }
};

// Share memory with specific users
exports.shareMemory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { shareWith } = req.body; // Array of user IDs or emails
    
    // Find memory
    const memory = await Memory.findOne({
      _id: id,
      user: req.user.id
    });
    
    if (!memory) {
      return res.status(404).json({ 
        success: false,
        error: {
          code: 'NOT_FOUND_ERROR',
          message: 'Memory not found'
        }
      });
    }
    
    // Update sharing settings
    memory.sharedWith = shareWith;
    memory.isPublic = true; // Make public when shared
    await memory.save();
    
    res.status(200).json({
      success: true,
      data: memory,
      msg: 'Memory shared successfully'
    });
  } catch (err) {
    next(err);
  }
};

// Get shared memories
exports.getSharedMemories = async (req, res, next) => {
  try {
    // Get memories shared with the current user
    const user = await User.findById(req.user.id);
    const patientIds = user.patients || [];
    
    // Build filter for shared memories
    const filter = {
      $or: [
        { user: { $in: patientIds } },
        { sharedWith: req.user.id }
      ]
    };
    
    const memories = await Memory.find(filter)
      .populate('user', 'name role')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: memories
    });
  } catch (err) {
    next(err);
  }
};
