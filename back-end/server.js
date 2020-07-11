const express = require('express');
const dotenv = require('dotenv');

// Loading env variables
dotenv.config({ path: './config/config.env' });

const app = express();

const port = process.env.PORT || 3000;

app.listen(3000, () => {
	console.log(
		`Server listening on port: ${port} in ${process.env.NODE_ENV} environment`
	);
});
