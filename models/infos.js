const mongoose = require('mongoose');

const infoSchema = new mongoose.Schema({
    name: String,
    charBuild: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Info'
    }]
});

const Info = mongoose.model('Info', infoSchema);

module.exports = Info;