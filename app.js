const express = require('express');
const app = express();
const pug = require('pug');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const PORT = 3000;

require('./db/db');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// char-info index
app.get('/:index', (req, res) => {

    res.render('char-info/index.pug')
})

// char-info new
app.get('/new', (req, res) => {
    res.render('char-info/new.pug');
})


// main hub
app.get('/', (req, res) => {
    // res.render('index', {title: 'Hey', message: 'Hello there!'})
    res.render('index')
});


app.listen(PORT, () => {
    console.log('server listening on port', PORT);
});