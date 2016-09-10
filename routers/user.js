var express = require('express');
var path = require('path');
var app = express();
var user = express.Router();
var userController = require('../controllers/userController.js');
var bodyParser = require('body-parser');
//var sha256

user.get("/", function(req, res){

  if (req.param('url')) {
    res.render('signin', { url: req.param('url') });
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); history.back(); </script>");
  }

});

//이부분 뭔 기능인지 잘 모르겠다_동우
user.get("/signup", function(req, res){
  if (req.param('step') == 'terms') {
    //res.sendfile('../public/signup.html');
    res.sendfile(path.resolve(__dirname+'/../public/signup.html'));
  } else if (req.param('step') == 'form') {
    //res.sendfile('../public/signup_form.html');
    res.sendfile(path.resolve(__dirname+'/../public/signup_form.html'));
  } else {
    res.send("<script> location.href = '/user/signup?step=terms' </script>");
  }
});

user.get("/session", function(req, res){
  res.send(req.session);
});

user.get("/signin", function(req, res){
  res.sendFile(path.resolve(__dirname + '/../public/signin.html'));
});

user.post("/signin", function(req, res){
  userController.signin(req, res);
});

user.post("/signup", function(req, res){
  userController.signup(req, res);
});

module.exports = user;
