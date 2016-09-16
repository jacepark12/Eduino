var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
  projectname: String,
  description: String, //설명같은거 들어갈듯....
  xml: String, // 프로젝트 관련 xml 들어갈듯
  owner: String, // 프로젝트 소유자의 이메일
  createdDate: Date,
  modifiedDate: Date
});

module.exports = mongoose.model('project', projectSchema);
