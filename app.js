var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();

var ejs = require('ejs');
var config = require('./config')['development'];
global._base_url = config.BASE_URL;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var users = require('./routers/user.js');
var projects = require('./routers/project.js');
var blockfactory = require('./routers/blockfactory.js');

mongoose.connect(config.MONGODB_URL);
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
app.engine('html', require('ejs').renderFile);

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
app.use('/blockfactory', blockfactory);

//임시로 이렇게 둠 나중에 라우터에다 메인페이지 만들어서 두어야함
app.get('/', function(req, res){
  if (req.session.email) {
    console.log("logined");
    res.send("<script> location.href='/project/list'; </script>")
  }
  else {
    console.log("notlogined");
    res.render('index.html',{'session': req.session});

  }
});

app.get('/projects', function(req ,res){
  res.render('projects.html');
});


app.get('*', function(req, res){
  res.status(404).send("Not Found<br>경로를 다시 한번 확인해주세요");
});

var server = app.listen(3030, function() {
  console.log("Eduino Web Server");
});
