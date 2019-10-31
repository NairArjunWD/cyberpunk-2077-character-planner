const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: String,
    // email: String,
    password: String
});

userSchema.methods.checkPassword = function (guess, done) {
    console.log(guess)
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
