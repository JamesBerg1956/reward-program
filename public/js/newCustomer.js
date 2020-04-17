$(document).ready(function () {
  // Getting references to our form and inputs
  var newCustForm = $("form.newCustForm");
  var firstName = $("input#inputFirstName");
  var lastName = $("input#inputLastName");
  var phone = $("input#inputPhone");
  var email = $("input#inputEmail");

  // When the form is submitted, we validate the information is entered.
  newCustForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      phone: phone.val().trim(),
      email: email.val().trim(),
    };
    if (!userData.email || !userData.phone || !userData.firstName) {
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
      .catch(function (err) {
        console.log(err);
      });
  }
});
