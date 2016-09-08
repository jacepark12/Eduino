var model = require('../models/userModel.js');
var jwt = require('jsonwebtoken');
var sha256 = require('sha256');

module.exports = {

  all: function(req, res) {
    model.find({}, function(err, user) {
      res.status(200);
      res.send(user);
    });
  },

  get: function(req, res, jsonData) {
    model.findOne(jsonData, function(err, user){

      if (user) {
        res.send(user);
      } else {
        res.status(404);
        res.send();
      }

    });
  },

  join: function(req, res, jsonData) {
    model.findOne({ 'email': jsonData.email}, function(err, user) {
      if (user) {
        res.status(400);
      } else {
        var user = new model(jsonData);

        user.save(function (err, user) {
          res.send(user);
        });
      }
    });
  },

  auth: function(req, res, email, password) {

    model.findOne({ 'email': email}, function(err, user) {

      var shaPassword = sha256(password);

      if (user && user.password == shaPassword) {

        var options = { expiresIn: "1 days" }; //TOKEN 생존 주기 1일
        var payload = { 'email': email };

        var token = jwt.sign(payload, SECRET_KEY);

        res.send(token);

      } else {
        res.send(401);
      }
    });
  }

}
