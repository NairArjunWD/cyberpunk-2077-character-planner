const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
    bname: String,
    background: String,
    class: String,
    prime: String,
    second: String
});

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;