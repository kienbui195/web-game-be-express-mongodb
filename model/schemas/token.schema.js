const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
	email: String,
	token: String
});

const TokenModel = mongoose.model('token', tokenSchema);

module.exports = { TokenModel };
