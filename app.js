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

// main hub
app.get('/', (req, res) => {
    // res.render('index', {title: 'Hey', message: 'Hello there!'})
    res.render('index')
});


app.listen(PORT, () => {
    console.log('server listening on port', PORT);
});