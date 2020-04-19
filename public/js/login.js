$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    console.log("Here1");
    $.post("/api/login", {
      email: email,
      password: password,
    })
      .then(function (response) {
        // check browser support for sessionStorage
        if (typeof Storage !== "undefined") {
          //store response.id into session as CompanyId
          sessionStorage.setItem("CompanyId", response.id);
          // redirect to the points page
          window.location.replace("/points");
        } else {
          alert(
            "This application uses session state. Please enable session state in your web browser"
          );
        }
      })
      .catch(handleLoginErr);

    function handleLoginErr(err) {
      var errMsg = err.responseText;
      emsgLink = "  Click here to signup";
      errMsg = errMsg + emsgLink.link("/signup");
      $("#alert .msg").html(errMsg);
      $("#alert").fadeIn(500);
    }
  }
});
