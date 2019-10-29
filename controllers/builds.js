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

// build edit route
router.get('/:id/edit', (req, res) => {
    Build.findById(req.params.id, (err, foundBuild) => {
        if (err) {
            res.send(err);
        } else {
            res.render('builds/edit.pug', {
                build: foundBuild
            })
        }
    })
})

router.put('/:id', (req, res) => {
    Build.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updateBuild) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/builds/' + req.params.id)
        }
    })
})

// build delete

router.delete('/:id', (req, res) => {

    Build.findByIdAndRemove(req.params.id, (err, response) => {

        Info.findOne({ 'builds': req.params.id }, (err, foundInfo) => {
            if (err) {
                res.send(err);
            } else {
                // attached to mongo arrays, has a remove that takes
                // an id
                foundInfo.builds.remove(req.params.id);
                // if we muitate a document, we need
                foundInfo.save((err, updatedInfo) => {
                    console.log(updatedInfo, ",--- this update info")
                    res.redirect('/builds')
                })
            }
        })

    });
});

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const createdBuild = await Build.create(req.body);

        const foundInfo = await Info.findById(req.body.infoId)

        foundInfo.builds.push(createdBuild);
        await foundInfo.save();
        res.redirect('/builds')
    } catch (err) {
        res.send(err)
    }
});

module.exports = router;