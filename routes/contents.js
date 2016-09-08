var express = require('express');
var router = express.Router();
var controller = require('../controllers/contentController.js');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var sha256 = require('sha256');

router.get('/', function(req, res){ //Collection URI
  controller.getPersonalization(req, res);
});

router.get('/:id', function(req, res){
  controller.get(req, res, req.params.id);
});

router.post('/:id/comment', function(req, res){

  jwt.verify(req.body.token, SECRET_KEY, function(err, decoded) {

    var comment = {
      'author': decoded.email,
      'comment': req.body.comment,
      'date': new Date()
    };

    controller.addComment(req, res, comment, req.params.id);
  });
});

module.exports = router;
