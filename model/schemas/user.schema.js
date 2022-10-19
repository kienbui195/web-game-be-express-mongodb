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
	isVerify: {
		type: Boolean,
		default: false,
	},
	point: Number,
	game: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'game'
		},
	],
	date_create: Date,
});

const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel };
