$(document).ready(function () {
  // Getting references to our form and inputs
  var saveCustomer = $("#saveCustomer");
  var firstName = $("input#inputFirstName");
  var lastName = $("input#inputLastName");
  var phone = $("input#inputPhone");
  var email = $("input#inputEmail");
  var customerList = $(".customerList");
  var companyHeader = $("#companyHeader");
  var custFocasId = "";
  //
  buildCustList();
  //
  var h1Tag = $("<h1>");
  h1Tag.text(`${sessionStorage.getItem("company_name")}`);
  companyHeader.append(h1Tag);
  //
  customerList.click(function (event) {
    custFocasId = event.target.id;
    buildCustList(custFocasId);
  });
  //
  // Build the cusomter list
  function buildCustList(custFocasId) {
    // var custFocasId = target;
    // const CompanyId = sessionStorage.getItem("CompanyId");
    var url = "/api/customer/" + sessionStorage.getItem("CompanyId");
    $.get(url, { custFocasId: custFocasId }, function (req, res) {
      customerList.empty();
      req.forEach(function (custArray) {
        var aTag = $("<a>");
        if (custFocasId == custArray.id) {
          // load the form
          // $("#edit-auction-modal").on("show.bs.modal", function (e) {
          firstName.val(custArray.first_name);
          lastName.val(custArray.last_name);
          phone.val(custArray.phone);
          email.val(custArray.email);
          // active.val(custArray.active);
          $("#addCustomer").modal();
          //   $("#edit-auction-modal ")
          //     .find("input#input-id")
          //     .val($(e.relatedTarget).data("title"));

          //   $("#modal-from-dom").bind("show", function () {
          //     $(".modal-body #wall-post").val($("#linkURL").val());
          //   });
          // });
          aTag.addClass("list-group-item list-group-item-action active");
        } else {
          aTag.addClass("list-group-item list-group-item-action");
          // aTag.text = `${custArray.firstName} - ${custArray.lastName}`;
        }
        aTag.text(
          `${custArray.first_name} ${custArray.last_name} - ${custArray.phone}`
        );
        aTag.attr("id", custArray.id);
        customerList.append(aTag);
      });
    });
  }
  // End Build Customer List
  //
  // When the form is submitted, we validate the information is entered.
  saveCustomer.on("click", function (event) {
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
        window.location.replace("/customers");
        // smh build cusotmer list
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
      var errorMessage = "Duplicate customer";
    } else {
      var errorMessage = "Error";
    }
    $("#alert .msg").html(errorMessage);
    $("#alert").fadeIn(500);
  }
});
