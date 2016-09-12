var sha256 = require('sha256');
var validator = require("email-validator");

var model = require('../models/projectModel.js');


module.exports = {

  getProject : function(req, res){
    var email = req.session.email;
    //session 에 있는 아이디의 프로젝트를 불러와서 렌더해서 보내주는 부분을 만들려 합니다
  },

  addProject : function(req, res){
    var email = req.session.email;

    var projectData = {
      owner: req.body.ownerEmail,
      contents: req.body.contents,
      projectname: req.body.projectname,
      xml: ''
    }

    model.findOne({ 'owner': req.body.email, 'projectname':req.body.projectname }, function(err, user) {
      if (user) {
        res.send("<script> alert('이미 존재하는 이름입니다. 다시 확인해주세요.'); history.back(); </script>");
      }
      else {
        var project = new model(projectData);

        //TODO Fixed null err
        project.save(function (err, user) {
          //res.send(user);
          res.send("<script> alert('생성되었습니다.'); location.href='http://localhost:3005'; </script>")
        });
      }
    });
  },

  save : function(req, res, id){
    //이건 프로젝트 저장부분  id는 프로젝트 _id임
    var email = req.session.email;
    // 특정 프로젝트를 특정할 때 키는 무엇으로 하지...?
    model.findOne({'email':email, '_id':id}, function(err, project){

    });
  }

}
