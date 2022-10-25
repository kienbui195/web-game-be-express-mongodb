const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
	email: String,
	code: String
})
const GameModel = mongoose.model('game', gameSchema);

module.exports = { GameModel };
