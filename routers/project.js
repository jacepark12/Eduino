var express = require('express');
var path = require('path');
var app = express();
var project = express.Router();
var Controller = require('../controllers/projectController.js');
var bodyParser = require('body-parser');

//router는 project 입니다.

project.get('/', function(req, res){
  res.send("/project/");
  //프로젝트 초기화면
});

project.post('/save/:id', function(req, res){
  res.send(id+"를 저장함");
  //프로젝트 저장하는 부분
});
