var express = require('express');
var mongoose = require('mongoose');
var app = express();

var ejs = require('ejs');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var userController = require('./controllers/userController.js'); // 이 프로젝트는 라우터를 따로 안쓰니까 복잡한듯하다...
//var projectController = require('./controllers/projectController.js')


mongoose.connect('mongodb://localhost/eduino');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('DB가 열렸습니다.');
});

SECRET_KEY = ""; //이거 아마 세션에서 사용하는 키인듯


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
  key: 'sid',
  secret: SECRET_KEY,
  cookie : {
    maxAge: 2000 * 60 * 60 //2시간
  }
}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", function(req, res){

  if (req.param('url')) {
    res.render('signin', { url: req.param('url') });
  } else {
    res.send("<script> alert('잘못된 접근입니다.'); history.back(); </script>");
  }

});

//이부분 뭔 기능인지 잘 모르겠다_동우
app.get("/signup", function(req, res){
  if (req.param('step') == 'terms') {
    res.sendfile('./public/signup.html');
  } else if (req.param('step') == 'form') {
    res.sendfile('./public/signup_form.html');
  } else {
    res.send("<script> location.href = '/signup?step=terms' </script>");
  }
});

app.get("/session", function(req, res){
  res.send(req.session);
});

app.post("/signin", function(req, res){
  controller.signin(req, res);
});

app.post("/signup", function(req, res){
  controller.signup(req, res);
});

var server = app.listen(3005, function() {
  console.log("Eduino Web Server");
});
