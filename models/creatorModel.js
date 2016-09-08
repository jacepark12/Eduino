var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var creatorSchema = new Schema({
  email: String,
  password: String,
  nickname: String,
  profile_image: String,
  info: String,
  name: String,
  categories: []
});

module.exports = mongoose.model('creator', creatorSchema);
