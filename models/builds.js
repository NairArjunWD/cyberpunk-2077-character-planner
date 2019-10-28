const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
    name: String
});

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;