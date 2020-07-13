const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('./ErrorResponse');
const User = require('../models/User');

// protect private REST end points
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	// extract token from headers or cookie
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.token) {
		token = req.cookies.token;
	}

	// check if token exists
	if (!token) {
		return next(new ErrorResponse('UnAuthorized access', 401));
	}

	// verify the given token
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decodedToken.id);
		next();
	} catch (error) {
		return next(new ErrorResponse('UnAuthorized access', 401));
	}
});
