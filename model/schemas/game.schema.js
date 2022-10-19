const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
	point: Number,
});

const GameModel = mongoose.model('game', gameSchema);

module.exports = { GameModel };
