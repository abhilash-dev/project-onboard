const Project = require('../models/Projects');
const path = require('path');
const ErrorResponse = require('../middleware/ErrorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  private
exports.getProjects = asyncHandler(async (req, res, next) => {
	const projects = await Project.find(req.query);
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

// @desc    upload a data file to project by project name
// @route   PUT /api/v1/projects/:name/file
// @access  private
exports.uploadLabelFile = asyncHandler(async (req, res, next) => {
	const project = await Project.findOne({ name: req.params.name });

	// check for valid project name
	if (!project) {
		return next(
			new ErrorResponse(
				`Project with name:${req.params.name} not found!`,
				404
			)
		);
	}

	// check if there is a file
	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file!`, 400));
	}

	const file = req.files.file;

	// check if the given file is a .json
	if (file.mimetype !== 'application/json') {
		return next(
			new ErrorResponse(`Bad Request: Please upload a JSON file!`, 400)
		);
	}

	// create a custom name to store on server
	file.name = `data_${project.name}${path.parse(file.name).ext}`;

	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.log(`${err}`.red);
			return next(
				new ErrorResponse(
					`There was a problem uploading the file!`,
					500
				)
			);
		}

		// update the data file custom name on project
		await Project.findOneAndUpdate(
			{ name: req.params.name },
			{ class_labels: file.name }
		);
	});

	res.status(200).json({
		success: true,
		data: `${file.name} uploaded successfully`,
	});
});
