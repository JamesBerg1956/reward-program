$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var companyNameInput = $("input#companyName-input");
  var phoneNumberInput = $("input#phoneNumber-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      companyName: companyNameInput.val().trim(),
      phoneNumber: phoneNumberInput.val().trim(),
    };

    if (
      !userData.email ||
      !userData.password ||
      !userData.companyName ||
      !userData.phoneNumber
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.companyName,
      userData.phoneNumber
    );
    emailInput.val("");
    passwordInput.val("");
    // phoneNumber.val(""); SMH - Why doesn't this work?
    // companyName.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, company_name, phone) {
    console.log("posting");
    $.post("/api/signup", {
      email: email,
      password: password,
      phone: phone,
      company_name: company_name,
      active: "1",
    })
      .then(function (data) {
        console.log("post api/signup");
        window.location.replace("/points");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
    // catch(function (handleLoginErr) {
    //   console.log("ERROR!!!!");
    //   console.log(handleLoginErr);
    // });

    // .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    // console.log(err.responseJSON);
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
