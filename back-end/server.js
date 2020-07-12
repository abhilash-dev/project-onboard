const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/customErrorHandler');
const fileUpload = require('express-fileupload');

// Loading env variables
dotenv.config({ path: './config/config.env' });

// connect to DB
connectDB();

// Route files
const projects = require('./routes/projects');

const app = express();

// middleware
app.use(bodyParser.json());

// dev logging middleware
app.use(morgan('tiny'));

// add file uploading
app.use(fileUpload());

// mount routers
app.use('/api/v1/projects', projects);

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
