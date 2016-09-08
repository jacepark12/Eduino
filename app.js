var express = require('express');
var app = express();
var mongoose = require('mongoose');

SECRET_KEY = "";


var users = require('./routes/users.js');
var creators = require('./routes/creators.js');
var contents = require('./routes/contents.js');

mongoose.connect('mongodb://localhost/webduino');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('[DB]Connected!]');
});

app.use('/users', users); //user 부분
app.use('/project', contents); //project 부분

var server = app.listen(3001, function() {
  console.log("server ON");
});
