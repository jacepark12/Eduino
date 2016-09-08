var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  nickname: String,
  profile_image: String
});

module.exports = mongoose.model('user', userSchema);
