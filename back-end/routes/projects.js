const express = require('express');
const {
	getProjects,
	createProject,
	getProject,
	updateProject,
	removeProject,
} = require('../controllers/projects');
const router = express.Router();

router.route('/').get(getProjects).post(createProject);

router.route('/:name').get(getProject).put(updateProject).delete(removeProject);

module.exports = router;
