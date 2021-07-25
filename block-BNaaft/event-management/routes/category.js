var express = require('express');
var router = express.Router();
var Event = require('../models/Event')
var Comment = require('../models/Comment')

router.get('/:category', (req, res, next) => {
    let category = req.params.category;
    Event.find({}).exec((err, event) => {
        var some = event.filter((elm) => {
            if(elm.event_category.split(',').includes(category)) {
                return elm;
            }
        })
        res.render('category', {events : some});
    })
})

module.exports = router