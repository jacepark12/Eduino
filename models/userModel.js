var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  password: String,
  nickname: String,
  profile_image: String,
  project: Array // 프로젝트 name, 프로젝트의 _id 로 될듯
});

module.exports = mongoose.model('user', userSchema);
