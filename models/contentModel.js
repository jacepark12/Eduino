var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contentSchema = new Schema({
  title: String,
  date:Date,
  creator: String,
  cover_image: String,
  content: Array,
  comments: Array, /* Embedded Document */
  hits: Number,
  likes: Number,
  shares: Number,
  categories: Array
});

module.exports = mongoose.model('content', contentSchema);
