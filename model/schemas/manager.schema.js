const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
	users: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],
});

const ManagerModel = mongoose.model('manager', managerSchema);

module.exports = { ManagerModel };
