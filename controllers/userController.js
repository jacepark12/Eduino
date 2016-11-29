var sha256 = require('sha256');
var validator = require("email-validator");

var model = require('../models/userModel.js');


module.exports = {

  all: function(req, res) {
    console.log(model.model);
  },

  signin: function(req, res) {
    var email = req.body.email;
    var password = sha256(req.body.password);

    var userData = {
      'email': email,
      'password': password
    };

    model.findOne(userData, function(err, user) {

      if (user) {

        req.session.email = email;
        //res.send("<script> location.href = '" + req.body.url + "' </script>");
        //res.send(req.session);
        //res.redirect("/user/mypage");
        res.redirect("/");
        //res.send("<script>history.back(); </script>");
        //아무래도 로그인 되면 이전 페이지로 보내주는게 맞는것같음. 한번 생각해보죠. 근데 첫 로그인시엔 마이페이지로 가야되는데,
        //어떤 작업하다가 로그인하러오면 로그인 하기 전 페이지로 가야하지않나?
      } else {
        res.send("<script> alert('이메일 혹은 비밀번호를 다시 확인해주세요.'); history.back(); </script>");
      }

    });

  },

  signup: function(req, res) {

    var email = req.body.email,
        password = req.body.password,
        //passwordRepeat = req.body.passwordrepeat,
        nickname = req.body.name;

    if (validator.validate(email) && nickname != '' ) {

      var userData = {
        email: req.body.email,
        password: sha256(req.body.password),
        nickname: req.body.name,
        profile_image: ''
      }

      model.findOne({ 'email': req.body.email }, function(err, user) {
        if (user) {
          res.send("<script> alert('이미 가입된 이메일입니다. 다시 확인해주세요.'); history.back(); </script>");
        } else {
          var user = new model(userData);

          user.save(function (err, user) {
            //res.send(user);
            res.send("<script> alert('가입되었습니다.'); location.href='http://localhost:3005'; </script>")
          });
        }
      });

    } else {
      res.send("<script> alert('잘못된 접근입니다.'); history.back(); </script>");
    }
  },

  logout: function(req, res){

    req.session.destroy();
    res.clearCookie('sid');
    res.send("<script> location.href='http://localhost:3005' </script>")
  },

  myPage : function(req, res){
    if(req.session.email) {
      res.render('mypage', {username: req.session.email});
    }else{
      //TODO 404 페이지만들장
      res.send("<script> alert('로그인을 해주시기 바랍니다.'); location.href='/user/signin'; </script>");
    }
  }

}
