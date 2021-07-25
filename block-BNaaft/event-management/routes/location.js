var express = require('express');
var router = express.Router();
var Event = require('../models/Event')
var Comment = require('../models/Comment')

router.get('/:location', (req, res, next) => {
    let location = req.params.location;
    Event.find({}).exec((err, events) => {
        let some = events.filter(elm => {
            if(elm.location.includes(location)) {
                return elm;
            }
        })
        res.render('location', {events : some});
    })
})

module.exports = router