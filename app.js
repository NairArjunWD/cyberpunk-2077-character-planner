const express = require('express');
const app = express();
const pug = require('pug');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const passport = require('passport')
const session = require('express-session');
const setUpPassport = require("./setuppassport");
const PORT = 3000;

// mongoose.connect("mongodb://localhost:27017/test");
setUpPassport();

require('./db/db');



// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.use(session({
    secret: "ilikecurry53324234324326rg65r7d65rsSTWW%knbfkjbfn#ETRZ",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(express.static('public'))

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

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