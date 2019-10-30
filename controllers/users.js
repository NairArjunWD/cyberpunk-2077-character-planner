const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const passport = require('passport')

router.get("/login", function (req, res) {
    res.render("login.pug");
});

router.get("/registration", function (req, res) {
    res.render("registration.pug");
});

// registration - only bcrypt
router.post('/registration', async (req, res) => {

    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));


    const userDBEntry = {};
    userDBEntry.username = req.body.username;
    userDBEntry.password = passwordHash;
    userDBEntry.email = req.body.email;

    const createdUser = await User.create(userDBEntry);
    console.log(createdUser);
    req.session.username = createdUser.username;
    req.session.logged = true;
    req.session.userId = createdUser._id

    res.redirect('/infos')


})


// logging out
router.get('/logout', function(req, res) {
    console.log('logout')
    req.session.destroy()
    req.logout();
    res.redirect('/');
})

// passing data to views
router.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.infos = req.flash('info');
    next();
});

// determining of user is authenicated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('info', 'You must be logged in to view this page!');
        res.redirect('/');
    }
}

// edit
router.get('/edit', ensureAuthenticated, function(req, res) {
    res.render('edit');
})

// logging in
router.post('/login', passport.authenticate('/login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
