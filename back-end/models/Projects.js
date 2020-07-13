const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please specify a project name'],
		unique: true,
		trim: true,
		maxlength: [50, 'Project Name cannot be more than 50 characters'],
	},
	data_type: {
		type: String,
		required: [
			true,
			'Please specify a data type (image / text / numerical)',
		],
		enum: ['image', 'text', 'numerical'],
		trim: true,
	},
	ipv4: {
		type: String,
		required: [true, 'Please specify a public IPv4 address'],
		trim: true,
		match: [
			/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
			'Please specify a valid public IPV4 address',
		],
	},
	port: {
		type: Number,
		required: [true, 'Please specify a port number'],
		match: [
			/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
			'Please specify a valid port number',
		],
	},
	train_size: {
		type: Number,
		required: [true, 'Please specify the training size'],
		//TODO: add min & max
	},
	problem_type: {
		type: String,
		required: [
			true,
			'Please specify a problem type (Object detection / Classification / Text Classification)',
		],
		enum: ['object_detection', 'classification', 'text_classification'],
	},
	class_labels: String,
	created_on: {
		type: Date,
		required: false,
		default: Date.now,
	},
});

// create a slug from the given project name
ProjectSchema.pre('save', function (next) {
	this.name = slugify(this.name, { lower: true, strict: true });
	next();
});

module.exports = mongoose.model('Project', ProjectSchema);
