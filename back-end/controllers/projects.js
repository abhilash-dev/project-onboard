const Project = require('../models/Projects');
const ErrorResponse = require('../middleware/ErrorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  private
exports.getProjects = asyncHandler(async (req, res, next) => {
	const projects = await Project.find();
	res.status(200).json({
		success: true,
		count: projects.length,
		data: projects,
	});
});

// @desc    create a new project
// @route   POST /api/v1/projects
// @access  private
exports.createProject = asyncHandler(async (req, res, next) => {
	const project = await Project.create(req.body);
	res.status(201).json({ success: true, data: project });
});

// @desc    Get a project by Name
// @route   GET /api/v1/projects/:name
// @access  private
exports.getProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findOne({ name: req.params.name });

	if (!project) {
		return next(
			new ErrorResponse(
				`Project with name:${req.params.name} not found!`,
				404
			)
		);
	}
	res.status(200).json({
		success: true,
		data: project,
	});
});

// @desc    update a project by name
// @route   PUT /api/v1/projects/:name
// @access  private
exports.updateProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findOneAndUpdate(
		{ name: req.params.name },
		req.body,
		{ new: true, runValidators: true }
	);

	if (!project) {
		return next(
			new ErrorResponse(
				`Project with name:${req.params.name} not found!`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		data: project,
	});
});

// @desc    remove a project by Name
// @route   DELETE /api/v1/projects/:name
// @access  private
exports.removeProject = asyncHandler(async (req, res, next) => {
	const project = await Project.findOneAndRemove({ name: req.params.name });

	if (!project) {
		return next(
			new ErrorResponse(
				`Project with name:${req.params.name} not found!`,
				404
			)
		);
	}

	res.status(200).json({
		success: true,
		data: {},
	});
});
