var mongoose = require('mongoose');

var Entry = mongoose.model('Entry', {
  author: String,
  photo_url: String,
  date_taken: String,
  createdAt: {
  likes: Number,
    type: Date,
    default: Date.now
  }
});

module.exports = Entry;
