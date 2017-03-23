var spinner = {
  show: function() {
    $("#spinner").show();
  },

  hide: function() {
    $("#spinner").hide();
  }
}

var publishBtn = {
  public: true,

  toggle: function() {
    var btn = $("nav #project-info ul li.publish");
    var icon = $("nav #project-info ul li.publish i");

    if (this.public == true) {
      this.public = false;

      btn.removeClass("public");
      btn.addClass("private");
      icon.removeClass("fa-unlock");
      icon.addClass("fa-lock");
    } else {
      this.public = true;

      btn.removeClass("private");
      btn.addClass("public");
      icon.removeClass("fa-lock");
      icon.addClass("fa-unlock");
    }
  }
}

var saveBtn = {
  save: function() {
    //Save Code

    spinner.show();
    setTimeout(function() {
      spinner.hide();
      alert.show("저장되었습니다.", "info", 3000);
    }, 500);
  }
}

var alert = {
  alertBox: $(".alertBox"),

  set: function(msg, error) {
    this.alertBox.text(msg);

    switch (error) {
      case "error":
        this.alertBox.css("backgroundColor", "#EC4566");
        this.alertBox.prepend('<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ');
        break;
      case "info":
        this.alertBox.css("backgroundColor", "#3BBD70");
        this.alertBox.prepend('<i class="fa fa-info-circle" aria-hidden="true"></i> ');
        break;
      default:
        this.alertBox.css("backgroundColor", "#323B4F");
    }
  },

  show: function(msg, type, time) {
    this.set(msg, type);

    this.alertBox.clearQueue();
    this.alertBox.fadeIn(500);

    var that = this;
    setTimeout(function() {
      that.alertBox.fadeOut(500);
    }, time);
  }
}

$('document').ready(function() {
  spinner.hide();

  $('nav #project-info ul li.publish').click(function() {
    publishBtn.toggle();
  });

  $('nav #project-info ul li.save').click(function() {
    saveBtn.save();
  });

  alert.show("Asdf");
});
