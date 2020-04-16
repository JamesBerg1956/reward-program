$(document).ready(function () {

  var arrPhoneInput = [];

  // TODO: revealHiddenSections function
  
  // TODO: generateCustomerInfoSpans function

  // TODO: generateRewardsCarousel function

  // TODO: generateRewardsHistoriesTable function

  // START number button event listener
  $(".number").click(function(){
    arrPhoneInput.push($(this).val());
    $("#phoneinput").text(arrPhoneInput.join(''))
  });
  // END number button event listener

  // START backspace event listener
  $("#button-backspace").click(function(){
    arrPhoneInput.pop();
    if(arrPhoneInput.length > 0){
      $("#phoneinput").text(arrPhoneInput.join(''))
    }
    else{
      $("#phoneinput").html("&nbsp;");
    }
  });

  // TODO: points submit button event listener

});
