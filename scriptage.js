var ageCookieName = "age-verification-verified-43212342";

function ageSetCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function ageGetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function ageVerificationHide() {
  var ageVerificationModel = document.getElementById('age-verification');
  ageVerificationModel.style.display = 'none';
}
function ageVerificationShow() {
  var ageVerificationModel = document.getElementById('age-verification');
  ageVerificationModel.style.display = 'block';
}

function ageVerificationLoad() {
    try {
      var agePass = ageGetCookie(ageCookieName);
      if (agePass != "") {
        ageVerificationHide();
        return;
      }
      else {
        ageVerificationShow();
      }
    }
    catch(err) {
      ageVerificationShow();
    }
}

function ageVerificationConfirm() {
  ageSetCookie(ageCookieName, "verified", 365);
  ageVerificationHide();
}

function ageVerificationFailed() {
    window.location.reload();
}

/** Run the verification after DOM has been loaded **/
document.addEventListener("DOMContentLoaded", function(event) {
  ageVerificationLoad();
});