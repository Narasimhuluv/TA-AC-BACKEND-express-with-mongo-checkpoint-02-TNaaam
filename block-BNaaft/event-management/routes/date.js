var express = require('express');
var router = express.Router();
var Event = require('../models/Event')
var Comment = require('../models/Comment');

router.get('/ascend', (req, res, next) => {
    Event.find({}).sort({start_date : 1}).exec((err, event) => {
        res.render('ascend', {events : event})
    })
})

router.get('/descend', (req, res, next) => {
    Event.find({}).sort({start_date : -1}).exec((err, event) => {
        res.render('descend', {events : event})
    })
})


module.exports = router;