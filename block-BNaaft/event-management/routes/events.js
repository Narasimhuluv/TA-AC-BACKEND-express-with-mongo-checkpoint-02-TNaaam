var express = require('express');
var router = express.Router();
var Event = require('../models/Event')
var Comment = require('../models/Comment')

/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render('eventsform')
});

// enter into all events page 
// router.post('/', (req,res,next) => {
//   // console.log(req.body)
//   Event.create(req.body,(err,event) => {
//     console.log(err,event)
//     if(err) return res.redirect('/events/new')
//     res.redirect('/events')
//   })
// })

router.post('/', (req,res,next) => {
  // console.log(req.body)
  Event.create(req.body,(err,event) => {
    console.log(err,event)
    if(err) return res.redirect('/events/new')
    res.redirect('/events')
  })
})


router.get('/', (req,res,next) => {
  Event.find({}, (err,event) => {
    if(err) return next(err);
    let allCategories = [];
    event.filter(event => {
      let splittedCategory = event.event_category.split(',');
      for(var i  = 0 ; i < splittedCategory.length ; i++) {
        if(!allCategories.includes(splittedCategory[i])) {
          allCategories.push(splittedCategory[i]);
        }
      }
    })
    let allLocations = [];
    event.filter(elm => {
      if(!allLocations.includes(elm.location)) {
        allLocations.push(elm.location);
      }
    })

    res.render('events', {events : event, allCategories, allLocations});
  })
})

// get single Event

// router.get('/:id', (req,res,next) => {
//   let id = req.params.id;
//   console.log(id)
//   Event.findById(id,(err,event) => {
//     if(err) return next(err)
//     res.render('singleevent', {events : event})
//   })
// })

router.get('/:id', (req,res,next) => {
  let id = req.params.id;
  console.log(id)
  Event.findById(id).populate('comments').exec((err,event) => {
    console.log(err,event)
    if(err) return next(err)
    res.render('singleevent', {events : event})
  })
})


// update and delete 

router.get('/:id/edit', (req,res,next) => {
  let id = req.params.id;
  Event.findById(id,(err,event) => {
    if(err) return next(err)
    res.render('updateeventform', {events : event})
  })
})

router.post('/:id', (req,res,next) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id,req.body,(err,event) => {
    if(err) return next(err)
    res.redirect('/events/' + id)
  })
})

router.get('/:id/delete', (req,res,next) => {
  let id = req.params.id;
  Event.findByIdAndRemove(id,(err,event) => {
    if(err) return next(err) 
    res.redirect("/events")
  })
} )


// likes increament and decreament

router.get('/:id/likes', (req,res,next) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id,{$inc : {likes : 1}},(err,event) => {
    if(err) return next(err)
    res.redirect('/events/' + id)
  })
})

router.get('/:id/dislikes', (req,res,next) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id,{$inc : {likes : -1}},(err,event) => {
    if(err) return next(err)
    res.redirect('/events/' + id)
  })
})


//add Comments

router.post('/:id/comments/new', (req,res,next) => {
  let id = req.params.id;
  let data = req.body;
  data.eventId = id;
  Comment.create(data,(err,comment) => {
    if(err) return next(err);
    Event.findByIdAndUpdate(id,{$push : {comments : comment._id}}, (err,updateBook) => {
      if(err) return next(err)
      // updateBook.eventId = comment.id
      res.redirect('/events/' + id)
    })
  })
})


module.exports = router;
