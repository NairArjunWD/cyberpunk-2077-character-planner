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



// info edit
router.get('/:id/edit', (req, res) => {
    Info.findById(req.params.id, (err, foundInfo) => {
        if(err){
            res.send(err);
        } else {
            res.render('infos/edit.pug', {
                info: foundInfo
            })
        }
    })
})

router.put('/:id', (req, res) => {
    Info.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateInfo) => {
        if(err){
            res.send(err)
        } else {
            res.redirect('/infos/' + req.params.id)
        }
    })
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

router.delete('/:id', (req, res) => {
    Info.findByIdAndRemove(req.params.id, (err, deletedInfo) => {
        if(err) {
            res.send(err)
        } else {
            console.log(deletedInfo)
            Info.remove({
                _id: {
                    $in: deletedInfo.builds
                }
            }, (err, response) => {
                console.log(response);
                res.redirect('/infos');
            })
        }
    });
});

router.post('/', async (req, res) => {
    try {
        const createdInfo = await Info.create(req.body);
        res.redirect('/infos')
    } catch {
        res.send(err)
    }
})

module.exports = router;