const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	point: Number,
	code: String,
	date_create: Date
});

const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel };
