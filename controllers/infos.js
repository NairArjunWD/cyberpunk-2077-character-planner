const express = require('express');
const router = express.Router();
const Info = require('../models/infos');
const Build = require('../models/builds');

// char-info index
router.get('/', (req, res) => {

    res.render('infos/index.pug')
})

// char-info new
router.get('/new', (req, res) => {
    res.render('infos/new.pug');
})

router.post('/', async(req, res) => {
    try {
        const createdCharInfo = await CharInfo.create(req.body);
        res.redirect('/infos')
    } catch {
        res.send(err)
    }
})

module.exports = router;