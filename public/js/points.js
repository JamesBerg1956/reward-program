$(document).ready(function () {

  var arrPhoneInput = [];

  // TODO: revealHiddenSections function
  
  // TODO: generateCustomerInfoSpans function

  // TODO: generateRewardsCarousel function

  // TODO: generateRewardsHistoriesTable function

  // START number button event listener
  $(".number").click(function(){
    event.preventDefault();
    arrPhoneInput.push($(this).val());
    $("#phoneinput").text(arrPhoneInput.join(''))
  });
  // END number button event listener

  // START backspace event listener
  $("#button-backspace").click(function(){
    event.preventDefault();
    arrPhoneInput.pop();
    if(arrPhoneInput.length > 0){
      $("#phoneinput").text(arrPhoneInput.join(''))
    }
    else{
      $("#phoneinput").html("&nbsp;");
    }
  });
  // END backspace event listener

  // START points submit button event listener
  $("#button-phoneSubmit").click(function(){
    //event.preventDefault();

    // ajax get request to /api/customer/:phone
    var settings = {
      "url": "/api/customer/"+$("#phoneinput").text(),
      "method": "GET",
      "timeout": 0,
    };
    
    $.ajax(settings).then(function (response) {

      const objCustomer = response[0];

      if(objCustomer){
        // populate text() of first_nameSpan last_nameSpan emailSpan
        $("#first_nameSpan").text(objCustomer.first_name);
        $("#last_nameSpan").text(objCustomer.last_name);
        $("#emailSpan").text(objCustomer.email);

        // hide #phoneContainer
        $("#phoneContainer").attr("class", "container d-none")

        // unhide #addPointsContainter
        $("#addPointsContainer").attr("class", "container d-block")

        //TODO: unhide #addPointsForm

        //TODO: unhide #rewardCarousel

        //TODO: unhide #rewardhistoryTable
      }
      else{
        alert("The phone searched for was not found");
      }

    }).catch(function(error){
      console.log(error);
    });

  });
  // END points submit button event listener

});
