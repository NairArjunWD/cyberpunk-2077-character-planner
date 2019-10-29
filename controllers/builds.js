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

    Build.find({}, (err, allInfos) => {
        if (err) {
            res.send(err)
        } else {
            console.log(allInfos)
            res.render('builds/new.pug', {
                infos: allInfos
            });
        }
    })
});

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