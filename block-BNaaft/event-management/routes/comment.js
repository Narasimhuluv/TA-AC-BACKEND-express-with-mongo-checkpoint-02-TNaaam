var express = require('express');
var router = express.Router();
var Event = require('../models/Event')
var Comment = require('../models/Comment')

router.get('/:id/edit', (req,res) => {
    let id = req.params.id;
    Comment.findById(id,(err,comment) => {
        if(err) return next(err);
        res.render('updatecomment', {comments : comment})
    })
})

router.post('/:id', (req,res,next) => {
    let id = req.params.id;
    Comment.findByIdAndUpdate(id,req.body,(err,updateComment) => {
        if(err) return next(err)
        res.redirect('/events/' + updateComment.eventId)
    })
})

router.get('/:id/delete', (req,res,next) => {
    let id = req.params.id;
    Comment.findByIdAndRemove(id,(err,removeComment) => {
        if(err) return next(err)
        res.redirect('/events/' + removeComment.eventId)
    })
})


module.exports = router