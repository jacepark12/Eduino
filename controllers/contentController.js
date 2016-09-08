var model = require('../models/contentModel.js');

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

module.exports = {

  getPersonalization: function(req, res, contentId, jsonData) {
    model.count({}, function(err, count) {
      var rndNum = Math.floor(Math.random() * (count - 1));

      model.findOne({}, function(err, content) {
        res.send(content);
      }).limit( 1 ).skip( rndNum );
    });
  },

  get: function(req, res, contentId) {
    model.findOne({_id:new ObjectId(contentId)}, function(err, content){
      res.send(content);
    })
  },

  addComment: function(req, res, comment, contentId) {
    model.findOne({_id:new ObjectId(contentId)}, function(err, content) {
      content.comments.push(comment);

      content.save(function (err, content) {
        res.send(content);
      });
    });
  },

  removeComment: function(req, res, jsonData) { //안만듬
    model.findOne({_id:new ObjectId("55f90e60a25f0c6d34574e14")}, function(err, content) {
      content.comments.push({
        'author':'마마잃은 중천공',
        'body': '아 몰'
      });

      content.save(function (err, content) {
        res.send(content);
      });
    });
  }

}
