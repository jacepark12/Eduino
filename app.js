var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

var ejs = require('ejs');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var users = require('./routers/user.js');
var projects = require('./routers/project.js'); //라우터명을 s를 붙일지 말지 고민중.... 그리고 아직 안만들어서 주석처리해둠

mongoose.connect('mongodb://serverone1741.cloudapp.net:27017/eduino');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('DB가 열렸습니다.');
});

SECRET_KEY = "asdfgh"; //이거 아마 세션에서 사용하는 키인듯


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
  key: 'sid',
  secret: SECRET_KEY,
  cookie : {
    maxAge: 1000 * 60 * 60 //1시간
  }
}));

app.set('view engine', 'ejs');

//console.log('__dirname : ');
//using google-blockl
app.use(express.static(__dirname + '/public'));
app.use("/css",  express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/img",  express.static(__dirname + '/public/js'));
app.use("/media", express.static(__dirname + '/public/media'));

//라우터 부분
app.use('/user', users);
app.use('/project', projects);

//임시로 이렇게 둠 나중에 라우터에다 메인페이지 만들어서 두어야함
app.get('/', function(req, res){
  res.render('mainpage',{'session': req.session});
});

app.get('/test/blockly', function(req, res){
  //res.render(workspace,{'xml_text':});
  

});

app.get('*', function(req, res){
  res.status(404).send("Not Found<br>경로를 다시 한번 확인해주세요");
})

var server = app.listen(3005, function() {
  console.log("Eduino Web Server");
});
