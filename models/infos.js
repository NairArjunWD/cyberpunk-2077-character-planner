const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    name: String,
    age: Number,
    voice: String,
    sex: String,
    ethnicity: String,
    background: String,
    builds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Build'
    }]
});

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;