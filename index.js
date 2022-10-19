const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
let bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./routes/user.route');

const PORT = 8000;

dotenv.config();
mongoose.connect(process.env.DB_URL, () => {
	console.log('DB connected!');
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan('common'));
app.use('/api', router);

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
