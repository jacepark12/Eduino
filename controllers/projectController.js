var sha256 = require('sha256');
var validator = require("email-validator");

var model = require('../models/projectModel.js');


module.exports = {

  projectList : function(req, res){
    var email = req.session.email;
    //session 에 있는 아이디의 프로젝트를 불러와서 렌더해서 보내주는 부분을 만들려 합니다.
    if(email) {
      model.find({'owner' : email}, function(err, doc){
          if(err) throw err;
          console.log(doc);

          res.render('projects', {name : email, projectArray : doc});
      });
    }else{
      //TODO 404 페이지만들장
      res.send("<script> alert('로그인을 해주시기 바랍니다.'); location.href='/user/signin'; </script>");
    }

  },

  addProject : function(req, res){
    var email = req.session.email;
    if (email){ //세션, 이메일이 있는경우
      var projectData = {
        owner: email,
        description: req.body.description,
        projectname: req.body.name,
        xml: '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>' // default project_xml
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

  save : function(req, res){
    //이건 프로젝트 저장부분 id는 프로젝트 _id임
    var project_name = req.params.name;
    var email = req.session.email;
    var xml = req.body.xml;
    var date = new Date();

    console.log('project save');
    console.log('project xml : ', xml)
    // 특정 프로젝트를 특정할 때 키는 무엇으로 하지...? -> _id 로
    model.findOne({'owner':email, 'projectname': project_name}, function(err, project){

      project.xml = xml;
      project.save();
      res.send("저장되었습니다.");
    });
  },

  renderproject: function(req, res, id){
    var email = req.session.email;
    var project_name = req.params.name;

    console.log('Rendering project : ' , project_name + ' / ' + email);
    model.findOne({'owner':email, 'projectname': project_name}, function(err, project){

      if(err) throw err;

      if(project){
        var xml_text = project.xml;
        console.log(project);
        console.log('xml_text : ' , xml_text);
        res.render('workspace',
            { projectxml : xml_text,
              projectname : project_name
        });
      }
      else{
        res.send("찾을수없습니다");
      }
    });
  }

}
