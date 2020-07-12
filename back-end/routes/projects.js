const express = require('express');
const {
	getProjects,
	createProject,
	getProject,
	updateProject,
	removeProject,
	uploadLabelFile,
} = require('../controllers/projects');
const router = express.Router();

router.route('/').get(getProjects).post(createProject);

router.route('/:name').get(getProject).put(updateProject).delete(removeProject);

router.route('/:name/file').put(uploadLabelFile);

module.exports = router;
