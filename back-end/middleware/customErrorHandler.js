const ErrorResponse = require('./ErrorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };
	error.message = err.message;

	// Log the error stack to console
	console.log(err.stack.red);

	// handle NoSQL injection errors / cast errors
	if (err.name === 'CastError') {
		error = new ErrorResponse('Bad Request', 400);
	}

	// handle duplicate key
	if (err.code === 11000) {
		const message = `Duplicate field value entered - ${JSON.stringify(
			err.keyValue
		)}`;
		error = new ErrorResponse(message, 400);
	}

	// Mongoose field validation errors
	if (err.name === 'ValidationError') {
		const message = [];
		Object.values(err.errors).map((e) => message.push(e.message));
		error = new ErrorResponse(message, 400);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		error: error.message,
	});
};

module.exports = errorHandler;
