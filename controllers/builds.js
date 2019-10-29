const express = require('express');
const router = express.Router();
const Build = require('../models/builds');
const Info = require('../models/infos');

// info index
router.get('/', (req, res) => {
    Build.find({}, (err, foundBuilds) => {
        if (err) {
            res.send(err);
        } else {
            res.render('builds/index.pug', {
                builds: foundBuilds
            });
        }
    })
})

// builds new route
router.get('/new', (req, res) => {

    Info.find({}, (err, allInfos) => {
        if (err) {
            res.send(err)
        } else {
            console.log(allInfos, '<---- this is the infos')
            res.render('builds/new.pug', {
                infos: allInfos
            });
        }
    })
});

// builds show route
router.get('/:id', (req, res) => {
    Info.findOne({'builds': req.params.id})
        .populate(
            {
                path: 'builds',
                match: {_id: req.params.id}
            })
        .exec((err, foundInfo) => {
            console.log(foundInfo, '<-----this is the info')
            if (err) {
                res.send(err);
            } else {
                res.render('builds/show.pug', {
                    info: foundInfo,
                    build: foundInfo.builds[0]
                })
            }
        })
})

router.post('/', async (req, res) => {
    try {
        const createdBuild = await Build.create(req.body);

        const foundInfo = await Info.findById('infoId')

        foundInfo.builds.push(createdBuild);
        await foundInfo.save();
        res.redirect('/builds')
    } catch (err) {
        res.send(err)
    }
});

module.exports = router;