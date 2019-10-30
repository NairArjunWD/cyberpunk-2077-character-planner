const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');



router.get('/', (req, res) => {

    // attached to the request object
    // we have the session (which is the cookie)
    // req.session is an object we can add any property to
    req.session.anyProperty = 'any Value'

    req.session.isLogged = true

    res.redirect('/infos');
})

router.post('/login', async (req, res) => {

    // find if the user exits
    try {
        const foundUser = await User.findOne({ username: req.body.username });
        // if User.findOne returns null/ or undefined it won't throw an error
        if (foundUser) {

            // comparee thier passwords
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                // if true lets log them in
                // start our session
                req.session.message = '';
                // if there failed attempts get rid of the message
                // from the session
                req.session.username = foundUser.username;
                req.session.logged = true;

                res.redirect('/infos')


            } else {
                // if the passwords don't match
                req.session.message = 'Username or password is incorrect';
                res.redirect('/');
            }


        } else {

            req.session.message = 'Username or password is incorrect';
            res.redirect('/');
            // / is where teh form is


        }




    } catch (err) {
        res.send(err);
    }

});

router.post('/registration', async (req, res) => {

    // first thing to do is hash the password
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));


    const userDBEntry = {};
    // right side of these are the info from the form
    // and our hashed password not the password from the form
    userDBEntry.username = req.body.username;
    userDBEntry.password = passwordHash;
    userDBEntry.email = req.body.email;

    // added the user to the db
    const createdUser = await User.create(userDBEntry);
    console.log(createdUser);
    req.session.username = createdUser.username;
    req.session.logged = true;

    res.redirect('/infos')


})






router.get('/logout', (req, res) => {

    // creates a brand new cookie, without any of our properties
    // that we previously added to it
    req.session.destroy((err) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    })

})

router.post('/login', (req, res) => {
    req.session.username = req.body.username;
    req.session.logged = true;
    console.log(req.session);
    res.redirect('/infos')
})


module.exports = router;
