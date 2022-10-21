const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    username: String,
    email: String,
    point: Number,
    date_create: Date
});

const ManagerModel = mongoose.model('Manager', managerSchema);

module.exports = { ManagerModel };
