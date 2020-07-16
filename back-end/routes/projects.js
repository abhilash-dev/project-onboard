const express = require('express');
const { protect } = require('../middleware/auth');
const {
	getProjects,
	createProject,
	getProject,
	updateProject,
	removeProject,
	uploadLabelFile,
	downloadLabelFile
} = require('../controllers/projects');
const router = express.Router();

router.route('/').get(protect, getProjects).post(protect, createProject);

router
	.route('/:name')
	.get(protect, getProject)
	.put(protect, updateProject)
	.delete(protect, removeProject);

router.route('/:name/file').put(protect, uploadLabelFile).get(protect, downloadLabelFile);

module.exports = router;
