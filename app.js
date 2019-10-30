const express = require('express');
const app = express();
const pug = require('pug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const PORT = 3000;

require('./db/db');



// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(session({
    secret: "this is a secret string",
    resave: false,
    saveUninitialized: false
}))

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

const infosController = require('./controllers/infos.js');
app.use('/infos', infosController);

const buildsController = require('./controllers/builds.js');
app.use('/builds', buildsController);

const usersController = require('./controllers/users.js');
app.use('/auth', usersController);

// main hub
app.get('/', (req, res) => {
    // res.render('index', {title: 'Hey', message: 'Hello there!'})
    res.render('index.pug', {
        message: req.session.message,
        logOut: req.session.logOutMsg
    })
});


app.listen(PORT, () => {
    console.log('server listening on port', PORT);
});