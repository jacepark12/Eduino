var sha256 = require('sha256');
var validator = require("email-validator");

var model = require('../models/projectModel.js');


module.exports = {

  projectList : function(req, res){
    var email = req.session.email;
    //session 에 있는 아이디의 프로젝트를 불러와서 렌더해서 보내주는 부분을 만들려 합니다
    model.find({'owner' : email}, function(err, doc){
        if(err) throw err;
        console.log(doc);

        res.render('projectlist', {name : email, projectArray : doc});
    });


  },

  addProject : function(req, res){
    var email = req.session.email;
    if (email){ //세션, 이메일이 있는경우
      var projectData = {
        owner: email,
        description: req.body.description,
        projectname: req.body.name,
        xml: ''
      }

      model.findOne({'owner': email, 'projectname':req.body.name }, function(err, user) {
        if(err){
          console.log(err);
          throw err;
        }

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
    }
    else { //세션이 없는경우
      //TODO 로그인해달라고 alert 하고, 로그인 창으로 리다이렉팅하기
      res.send("<script> alert('로그인을 해주시기 바랍니다.'); location.href='/user/signin'; </script>")
    }

  },

  save : function(req, res, id){
    //이건 프로젝트 저장부분  id는 프로젝트 _id임
    var email = req.session.email;
    // 특정 프로젝트를 특정할 때 키는 무엇으로 하지...?
    model.findOne({'email':email, '_id':id}, function(err, project){

    });
  }

}
