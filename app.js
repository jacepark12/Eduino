var express = require('express');
var app = express();
var mongoose = require('mongoose');

SECRET_KEY = "";


var users = require('./routes/users.js');
var creators = require('./routes/creators.js');
var contents = require('./routes/contents.js');

mongoose.connect('mongodb://localhost/kactale');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('데이터베이스에 연결되었습니다.');
});

app.use('/users', users);
app.use('/creators', creators);
app.use('/contents', contents);

var server = app.listen(3001, function() {
  console.log("칵테일 Restful API 서버가 시작되었습니다.");
});
