var express = require('express');
var path = require('path');
var app = express();
var user = express.Router();
var Controller = require('../controllers/userController.js');
var bodyParser = require('body-parser');
//var sha256


//router는 user 입니다.
user.get("/", function(req, res){
  //이거 왜 url이 있어야하는거야
  // if (req.param('url')) {
  //   res.render('signin', { url: req.param('url') });
  // } else {
  //   res.send("<script> alert('잘못된 접근입니다.'); history.back(); </script>");
  // }
  if (req.session.email){ //세션에 이메일이 있기만 해도 로그인 되있다고 나옴. 나중에 활용할때 이메일로 그 사람의 프로젝트 db접근해서 불러오게 하면 될듯함.
      console.log('already logined');
      res.redirect('/user/mypage');
  }
  else{
    res.sendFile(path.resolve(__dirname + '/../public/signin.html'));
  }

});

//이부분 뭔 기능인지 잘 모르겠다_동우, 알아내었다.
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
  if (req.session.email){ //세션에 이메일이 있기만 해도 로그인 되있다고 나옴. 나중에 활용할때 이메일로 그 사람의 프로젝트 db접근해서 불러오게 하면 될듯함.
      console.log('already logined');
      res.redirect('/user/mypage');
  }
  else{
    res.sendFile(path.resolve(__dirname + '/../public/signin.html'));
    //res.render(signin);
  }

});

user.post("/signin", function(req, res){
  Controller.signin(req, res);
});

user.post("/signup", function(req, res){
  Controller.signup(req, res);
});

user.get("/logout", function(req, res){
  Controller.logout(req, res);
});

user.get('/mypage', function(req,res) {
  Controller.myPage(req, res);
});

module.exports = user;
