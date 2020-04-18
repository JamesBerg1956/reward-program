$(document).ready(function () {
  // Getting references to our form and inputs
  var newCustForm = $("form.newCustForm");
  var firstName = $("input#inputFirstName");
  var lastName = $("input#inputLastName");
  var phone = $("input#inputPhone");
  var email = $("input#inputEmail");

  // When the form is submitted, we validate the information is entered.
  newCustForm.on("submit", function (event) {
    console.log("Submitted");
    event.preventDefault();
    var userData = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      phone: phone.val().trim(),
      email: email.val().trim(),
    };
    if (!userData.email || !userData.phone || !userData.firstName) {
      $("#alert .msg").text("All fields must be entered");
      $("#alert").fadeIn(500);
      return;
    }

    signUpCustomer(
      userData.firstName,
      userData.lastName,
      userData.phone,
      userData.email
    );
    firstName.val("");
    lastName.val("");
    phone.val("");
    email.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function signUpCustomer(firstName, lastName, phone, email) {
    console.log("calling /api/customer/");
    $.post("/api/customer/", {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      active: "1",
    })
      .then(function () {
        window.location.replace("/points");
        // If there's an error, log the error
      })
      // .catch(function (err) {
      //   console.log(err);
      // });
      .catch(handleLoginErr);
  }
  //
  //  This will handle the display of the error.
  function handleLoginErr(err) {
    // console.log("Made it to handleLoginErr");
    // var errorMessage = "There is an Error!";
    //
    console.log(err.responseJSON);
    if (err.responseJSON.parent.errno == "1062") {
      // console.log(err.responseJSON.parent.errno == '1062');
      var errorMessage =
        "Duplicate customer: Phone numbers and emails must be unique";
    } else {
      var errorMessage = "Error";
    }
    $("#alert .msg").html(errorMessage);
    $("#alert").fadeIn(500);
  }
});
