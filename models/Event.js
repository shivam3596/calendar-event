const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
  title: {
    type: String
  },
  date: {
    type: Date
  },
  time: {
    type: String
  },
  visitorId: {
    type: Number
  },
  repeat: {
    type: Boolean,
    default: false
  },
}, {
    collection: 'events'
  })

module.exports = mongoose.model('Event', eventSchema)
