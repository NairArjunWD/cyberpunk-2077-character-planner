const express = require('express');
const router = express.Router();
const Info = require('../models/infos');
const Build = require('../models/builds');

// info index
router.get('/', (req, res) => {

    Info.find({}, (err, allInfos) => {
        if(err){
            res.send(err);
        } else {
            res.render('infos/index.pug', {
                infos: allInfos
            });
        }
    })

    // res.render('infos/index.pug')
})

// info new
router.get('/new', (req, res) => {
    res.render('infos/new.pug');
})

router.post('/', async(req, res) => {
    try {
        const createdInfo = await Info.create(req.body);
        res.redirect('/infos')
    } catch {
        res.send(err)
    }
})

// info show
router.get('/:id', (req, res) => {
    // console.log(foundInfo.builds)
    // res.render('infos/show.pug')
    Info.findById(req.params.id)
        .populate({path: 'builds'})
        .exec((err, foundInfo) => {
            if(err) {
                res.send(err);
            } else {
                console.log(foundInfo.builds)
                res.render('infos/show.pug', {
                    info: foundInfo
                })
            }
        })
})

module.exports = router;