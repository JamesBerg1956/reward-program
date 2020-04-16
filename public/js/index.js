// Getting references to our form and input
var signupButton = $("#signupButton");
var loginButton = $("#loginButton");

$(document).ready(function () {
  console.log("here!!");

  // When the signup button is clicked, we validate the email and password are not blank
  signupButton.click(function (event) {
    console.log("here");
    $.get("/signup").then((response) => {
      console.log("yeah!");
    });
  });
});
