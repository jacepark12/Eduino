var express = require('express');
var router = express.Router();
var controller = require('../controllers/userController.js');
var bodyParser = require('body-parser');
var sha256 = require('sha256');

router.get('/', function(req, res){ //Collection URI
  controller.all(req, res);
});

router.get('/:email', function(req, res){ //get user
  controller.get(req, res, {'email': req.params.email});
});

router.post('/:email', function(req, res){ //create user
  controller.join(req, res, {
    email: req.params.email,
    password: sha256(req.body.password), //평문으로 보내면 알아서 암호화 -> 평문으로 보내는 부분에서 해킹 위험이 있지 않나? 암호화해서 보내주는게 좋지 않나?
    nickname: req.body.nickname,
    profile_image: null,
    name: req.body.name,
    age: req.body.age,
    is_social: false,
    gender: false,
    birthday: new Date(),
    categories: [],
    following_creators: [],
    collections: []
  });
});

router.get('/auth/:email', function(req, res){
  var email = req.params.email;
  var password = req.query.password;

  controller.auth(req, res, email, password);
});

module.exports = router;
