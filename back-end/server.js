const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/customErrorHandler');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

// Loading env variables
dotenv.config({ path: './config/config.env' });

// connect to DB
connectDB();

// Route files
const projects = require('./routes/projects');
const auth = require('./routes/auth');

const app = express();

// middleware
app.use(bodyParser.json());

// cookie parser
app.use(cookieParser());

// dev logging middleware
app.use(morgan('tiny'));

// add file uploading
app.use(fileUpload());

// mongo sanitize to prevent NoSQL injection
app.use(mongoSanitize());

// add security headers
app.use(helmet());

// prevent XSS attacks
app.use(xss());

// add CORS filter
app.use(cors({ credentials: true, origin: `${process.env.CORS_ORIGIN}` }));

// add http param pollution protection
app.use(hpp());

// Rate limiting
const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute window
	max: 100, // max 100 requests after which throws 429: too many requests
});

// mount routers
app.use('/api/v1/projects', projects);
app.use('/api/v1/auth', auth);

// set up custom error handler
app.use(errorHandler);

const port = process.env.PORT || 3000;

const server = app.listen(3000, () => {
	console.log(
		`Server listening on port: ${port} in ${process.env.NODE_ENV} environment`
			.yellow.bold
	);
});

// handle runtime fatal errors
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error: ${err.message}`.red.bold);
	// close the server & exit the process
	server.close(() => process.exit(1));
});
