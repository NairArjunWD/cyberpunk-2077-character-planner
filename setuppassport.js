const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users')

passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
passport.authenticate('local', { successFlash: 'Welcome!' });


passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.use('/login', new LocalStrategy(
    function(username, password, done) {
         User.findOne({username: username}, function(err, user) {
             if (err) {return done(err);}
             if(!user) {
                 return done(null, false,
                    {message: 'No user has that username!'});
             }
             user.checkPassword(password, function(err, isMatch){
                 if (err) {return done (err); }
                 if (isMatch) {
                     return done (null, user);
                 } else {
                     return done (null, false,
                        {message: 'Invalid password'});
                 }
             });
         });
    }
));

module.exports = function() {
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        })
    })
}