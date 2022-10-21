const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./routes/auth.route');

const port = process.env.PORT || 8000;

app.use(cors());
dotenv.config();
mongoose.connect(
	'mongodb+srv://admin395:neCVCjNrS4269Yiv@casem5reactjs.8wszhbp.mongodb.net/?retryWrites=true&w=majority',
	() => {
		console.log('DB connected!');
	}
);
app.use(bodyParser.json({ limit: '50mb' }));

app.use(morgan('common'));
app.use('/api', router);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
