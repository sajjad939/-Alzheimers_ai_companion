// Routes for memory CRUD
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const memoriesController = require('../controllers/memoriesController');
const { createMemoryValidation, updateMemoryValidation } = require('../validators/memoryValidator');
const validate = require('../middlewares/validateInput');

// Create memory with optional photo/voice upload
router.post(
	'/',
	auth,
	createMemoryValidation,
	validate,
	upload.fields([
		{ name: 'photo', maxCount: 1 },
		{ name: 'voice', maxCount: 1 },
	]),
	memoriesController.createMemory
);

router.get('/', auth, memoriesController.getMemories);
router.get('/:id', auth, memoriesController.getMemoryById);
router.put(
	'/:id',
	auth,
	updateMemoryValidation,
	validate,
	upload.fields([
		{ name: 'photo', maxCount: 1 },
		{ name: 'voice', maxCount: 1 },
	]),
	memoriesController.updateMemory
);
router.delete('/:id', auth, memoriesController.deleteMemory);
router.get('/timeline', auth, memoriesController.getMemoryTimeline);
router.post('/:id/share', auth, memoriesController.shareMemory);
router.get('/shared', auth, memoriesController.getSharedMemories);

module.exports = router;
