var sha256 = require('sha256');
var validator = require("email-validator");

var model = require('../models/projectModel.js');


module.exports = {

  getProject : function(req, res){
    var sid = req.session.sid;
    //session 에 있는 아이디의 프로젝트를 불러와서 렌더해서 보내주는 부분을 만들려 합니다
  },

  save : function(req, res, id){
    //이건 프로젝트 저장부분  id는 프로젝트 id임
  }

}
