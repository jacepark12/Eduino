var express = require('express');
var path = require('path');
var app = express();
var project = express.Router();
var Controller = require('../controllers/projectController.js');
var bodyParser = require('body-parser');

//router는 project 입니다.

project.get('/list', function(req, res){
  //res.send("/project/");
  //프로젝트 초기화면
  //프로젝트 리스르틀 보여주장
  Controller.projectList(req,res);
});

project.get('/add', function(req, res){
  //TODO 이거 Controller 모듈로 빼야함
  //req.session.email 없으면 예외처리 해주장 -> 해결함
  //Controller로 뺄까? -> ㄴㄴ 일단 여기다
  var email = req.session.email;
  if (email){ //세션, 이메일이 있는경우
    res.render('createProject', {url : "test"});
  }
  else { //세션이 없는경우
    //TODO 로그인해달라고 alert 하고, 로그인 창으로 리다이렉팅하기
    res.send("<script> alert('로그인을 해주시기 바랍니다.'); location.href='/user/signin'; </script>")
  }
});

project.post('/add', function(req, res){
  //project 생성하는 부분
  //body -> owner: String, contents: String, projectname:String, xml:String
  Controller.addProject(req, res);
});

// TODO Rmove legacy code
project.get('/test/:id', function(req, res){
  var id = req.param.id;

  Controller.renderproject(req,res,id);
});

project.get('/workspace/:name', function(req, res){
  Controller.renderproject(req,res);
});

// TODO Rename URL
project.post('/workspace/:name', function(req, res){
  Controller.save(req, res);
});

module.exports = project;
