let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();

// Event Model
let eventSchema = require('../models/Event');

// CREATE Event
router.route('/create-event').post((req, res, next) => {
  eventSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
});

// READ Events
router.route('/visitor/:id').get((req, res) => {
  eventSchema.find({visitorId : req.params.id}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Update Event
router.route('/update-event/:id').put((req, res, next) => {
  eventSchema.findByIdAndUpdate({_id: req.params.id}, {
    $set: {date: req.body.date, time: req.body.time}
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('Event updated successfully !')
    }
  })
})

// Delete Event
router.route('/delete-event/:id').delete((req, res, next) => {
  eventSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;
