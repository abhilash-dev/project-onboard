const User = require('../models/User');
const ErrorResponse = require('../middleware/ErrorResponse');
const asyncHandler = require('../middleware/async');
const processMultipart = require('express-fileupload/lib/processMultipart');

// @desc    Register a User
// @route   POST /api/v1/auth/register
// @access  public
exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
	});

	// Create token
	const token = user.getSignedJwtToken();

	sendTokenResponse(user, 201, res);
});

// @desc    Login a User
// @route   POST /api/v1/auth/login
// @access  public
exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	// validate email & password
	if (!email || !password) {
		return next(
			new ErrorResponse('Please provide both Email & Password', 400)
		);
	}

	// check if user exists
	const user = await User.findOne({ email });

	if (!user) {
		return next(new ErrorResponse('Invalid Email or Password', 401));
	}

	// check if the password matches
	const passwordsMatch = await user.comparePassword(password);

	if (!passwordsMatch) {
		return next(new ErrorResponse('Invalid Email or Password', 401));
	}

	// Create token
	const token = user.getSignedJwtToken();

	sendTokenResponse(user, 200, res);
});

// @desc    Get the current logged In User
// @route   POST /api/v1/auth/me
// @access  private
exports.getCurrentUser = asyncHandler(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({ success: true, data: user });
});

// Send JWT token within a cookie
const sendTokenResponse = (user, statusCode, res) => {
	// Create token
	const token = user.getSignedJwtToken();
	const dayInMillis = 24 * 60 * 60 * 1000;

	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * dayInMillis
		),
		httpOnly: true,
	};

	res.status(statusCode).cookie('token', token, cookieOptions).json({
		success: true,
		token,
	});
};
