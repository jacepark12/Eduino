var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  nickname: String,
  profile_image: String,
  name: String,
  age: Number,
  is_social: Boolean,
  gender: Boolean,
  birthday: Date,
  categories: Array,
  following_creators: Array,
  collections: Array
});

module.exports = mongoose.model('user', userSchema);
