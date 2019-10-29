const mongoose = require('mongoose');

const buildSchema = new mongoose.Schema({
    bname: String,
    background: String,
    class: String,
    melee: String
});

const Build = mongoose.model('Build', buildSchema);

module.exports = Build;