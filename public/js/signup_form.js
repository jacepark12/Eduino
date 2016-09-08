$(document).ready(function(){

  var emailValidation = false,
      passwordValidation = false,
      nicknameValidation = false;

  function emailValidationCheck() {
    var inputEmail = $("#email").val();
    var regExp = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/;

    if (!regExp.test(inputEmail)) {
      $("#emailCaution").text("올바른 이메일 주소 형식이 아닙니다.");
      return false;
    } else {
      $("#emailCaution").text("");
      return true;
    }
  }

  function passwordValidationCheck() {
    var password = $("#password").val();
    var passwordRepeat = $("#password-repeat").val();

    if (passwordRepeat == password) {
      $("#passwordCaution").css("color", "#66A650");
      $("#passwordCaution").text("비밀번호가 일치합니다.");
      return true;
    } else {
      $("#passwordCaution").css("color", "#CC4739");
      $("#passwordCaution").text("비밀번호가 일치하지 않습니다.");
      return false;

    }
  }

  function nicknameValidationCheck() {
    var nickname = $("#nickname").val();

    if (nickname == '') {
      $("#nicknameCaution").text("유효하지 않은 닉네임입니다.");
      return false;
    } else {
      $("#nicknameCaution").text("");
      return true;
    }
  }

  function formValidationCheck() {

    if (emailValidationCheck() && passwordValidationCheck() && nicknameValidationCheck()) {
      $("#signupForm").submit();
    } else {
      alert("모든 값을 유효하게 입력해주세요.");
    }

  }


  $("#email").change(function() {
    emailValidation = emailValidationCheck();
  });

  $("#password-repeat").change(function() {
    passwordValidation = passwordValidationCheck();
  });

  $("#password").change(function() {
    passwordValidation = passwordValidationCheck();
  });

  $("#nickname").change(function() {
    nicknameValidation = nicknameValidationCheck();
  });

  $("#btnSignup").click(function() {
    formValidationCheck();
  });

});
