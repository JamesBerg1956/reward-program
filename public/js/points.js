$(document).ready(function () {

  var arrPhoneInput = [];
  var arrPlusInput = [];
  var customerId;
  var arrRewardHistory;

  // TODO: generateRewardsHistoriesTable function

  // START number button event listener
  $(".number").click(function(){
    //event.preventDefault();
    arrPhoneInput.push($(this).val());
    $("#phoneinput").text(arrPhoneInput.join(''))
  });
  // END number button event listener

  // START backspace event listener
  $("#button-backspace").click(function(){
    //event.preventDefault();
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
    const settings = {
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
        customerId = objCustomer.id;

        // hide #phoneContainer
        $("#phoneContainer").attr("class", "container d-none")

        // unhide #addPointsContainter
        $("#addPointsContainer").attr("class", "container d-block")

      }
      else{
        alert("The phone searched for was not found");
      }

    })
    .then(generateRewardHistory)
    .then(generateRewardsCarousel)
    .catch(function(error){
      console.log(error);
    });

  });
  // END points submit button event listener

  // START plus button event listener
  $(".plus").click(function(event){
  
    arrPlusInput.push(parseInt($(this).val()));
  
    $("#addPointsInput").val(arrPlusInput.reduce((a, b) => a + b, 0));

  })
  // END plus button event listener

  // START addPointsSubmit event listener
  $("#addPointsSubmit").click(function(event){
    
    // ajax post to /api/rewards/history
    const settings = {
      "url": "/api/rewardhistory/",
      "method": "POST",
      "timeout": 0,
      "data": {
        "points_change": $("#addPointsInput").val(),
        "CustomerId": customerId
      }
    };
    
    $.ajax(settings).done(generateRewardHistory);

  });
  // END addPointsSubmit event listener

  // START generateRewardHistory function
  function generateRewardHistory(){
    // call ajax GET on rewardhistories where id = customerId
    const settings = {
      "url": "/api/rewardhistory/"+customerId,
      "method": "GET",
      "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
      // store current state of rewardhistory database in object array
      arrRewardHistory = response;

      // sum points_added from rewardhistory and assign it to #currentPointsSpan
      let pointTotal = 0;
      for (let i = 0; i < arrRewardHistory.length; i++) {
        pointTotal += arrRewardHistory[i].points_change;
      }
      $("#currentPointsSpan").text(pointTotal);
    });
  }
  // END generateRewardHistory function

  // START generateRewardsCarousel function
  function generateRewardsCarousel(){
    // Get currently logged on company
    const CompanyId = sessionStorage.getItem("CompanyId");

    // call ajax to get all rewards where CompanyId = CompanyId
    var settings = {
      "url": "/api/rewards/"+CompanyId,
      "method": "GET",
      "timeout": 0,
    };
    
    $.ajax(settings).done(function (arrObjRewards) {

      // loop through arrObjRewards

        // create li carousel indicator(s) data-slide-to=[i] if i === 0 then .activ

        // append li carousel indicator to ol.carousel-indicators

        // create div.carousel-item(s) - if i === 0 then .active

        // create div.card

        // create div.card-body

        // create h5.card-title

        // add arrObj[i].reward_name to h5.card-title

        // create p.card-text

        // add arrObj[i].reward_description to p.card-text

        // create a.btn btn-success

        // add arrObj[i].reward_points to a.btn btn-success

        // append h5.card-title to div.card-body

        // append p.card-text to div.card-body

        // append a.btn btn-success to div.card-body

        // append div.card-body to div.card

        // append div.card to div.carousel-item

        // append div.carousel-item to div.carousel-inner

    });

  }
  // END generateRewardsCarousel function

});
