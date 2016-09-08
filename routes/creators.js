var express = require('express');
var router = express.Router();
var controller = require('../controllers/creatorController.js');
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
    password: sha256(req.params.password),
    nickname: req.params.nickname,
    profile_image: null,
    info: req.params.info,
    name: req.params.name,
    categories: []
  });
});

module.exports = router;
