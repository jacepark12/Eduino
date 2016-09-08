var model = require('../models/creatorModel.js');

module.exports = {

  all: function(req, res) {
    model.find({}, function(err, creator) {
      res.send(creator);
    });
  },

  get: function(req, res, jsonData) {
    model.findOne(jsonData, function(err, creator){

      if (creator) {
        res.send(creator);
      } else {
        res.status(404);
      }

    });
  },

  join: function(req, res, jsonData) {
    model.findOne({ 'email': jsonData.email}, function(err, creator) {
      if (user) {
        res.status(400);
      } else {
        var user = new model(jsonData);

        user.save(function (err, creator) {
          res.send(creator);
        });
      }
    });
  },

  auth: function(req, res, email, password) {
    //크리에이터 인증은 제작중임
  }

}
