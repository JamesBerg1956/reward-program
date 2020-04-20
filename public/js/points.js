// START document.ready
$(document).ready(function () {
  var arrPhoneInput = [];
  var arrPlusInput = [];
  var customerId;
  var arrRewardHistory;

  // TODO: generateRewardsHistoriesTable function

  // START number button event listener
  $(".number").click(function () {
    //event.preventDefault();
    arrPhoneInput.push($(this).val());
    $("#phoneinput").text(arrPhoneInput.join(""));
  });
  // END number button event listener

  // START backspace event listener
  $("#button-backspace").click(function () {
    //event.preventDefault();
    arrPhoneInput.pop();
    if (arrPhoneInput.length > 0) {
      $("#phoneinput").text(arrPhoneInput.join(""));
    } else {
      $("#phoneinput").html("&nbsp;");
    }
  });
  // END backspace event listener

  // START points submit button event listener
  $("#button-phoneSubmit").click(function () {
    //event.preventDefault();

    // ajax get request to /api/customer/:phone
    const settings = {
      url: "/api/customerPhone/" + $("#phoneinput").text(),
      method: "GET",
      timeout: 0,
    };
    $.ajax(settings)
      .then(function (response) {
        const objCustomer = response[0];
        if (objCustomer) {
          // populate text() of first_nameSpan last_nameSpan emailSpan
          $("#first_nameSpan").text(objCustomer.first_name);
          $("#last_nameSpan").text(objCustomer.last_name);
          $("#emailSpan").text(objCustomer.email);
          customerId = objCustomer.id;

          // hide #phoneContainer
          $("#phoneContainer").attr("class", "container d-none");

          // unhide #addPointsContainter
          $("#addPointsContainer").attr("class", "container d-block");
        } else {
          alert("The phone searched for was not found");
        }
      })
      .then(generateRewardHistory)
      .then(generateRewardsCarousel)
      .catch(function (error) {
        console.log(error);
      });
  });
  // END points submit button event listener

  // START plus button event listener
  $(".plus").click(function (event) {
    arrPlusInput.push(parseInt($(this).val()));

    $("#addPointsInput").val(arrPlusInput.reduce((a, b) => a + b, 0));
  });
  // END plus button event listener

  // START addPointsSubmit event listener
  $("#addPointsSubmit").click(function (event) {
    // ajax post to /api/rewards/history
    const settings = {
      url: "/api/rewardhistory/",
      method: "POST",
      timeout: 0,
      data: {
        points_change: $("#addPointsInput").val(),
        CustomerId: customerId,
      },
    };

    $.ajax(settings).done(generateRewardHistory);
  });
  // END addPointsSubmit event listener

  // START generateRewardHistory function
  function generateRewardHistory() {
    //reset value of array that tracks points to add
    arrPlusInput.length = 0;

    //reset value of $("#addPointsInput")
    $("#addPointsInput").val("");

    //remove all elements from $("#tbodyRewardHistory")
    $("#tbodyRewardHistory").empty();

    // call ajax GET on rewardhistories where id = customerId
    const settings = {
      url: "/api/rewardhistory/" + customerId,
      method: "GET",
      timeout: 0,
    };
    $.ajax(settings).done(function (response) {
      // store current state of rewardhistory database in object array
      arrRewardHistory = response;

      // sum points_added from rewardhistory and assign it to #currentPointsSpan
      let pointTotal = 0;
      for (let i = 0; i < arrRewardHistory.length; i++) {
        const currentRewardHistory = arrRewardHistory[i];
        // accumulate point total
        pointTotal += currentRewardHistory.points_change;

        // create tr element for tbodyRewardHistory
        const tr = $("<tr>");

        // create td element for id
        const tdId = $("<td>");

        // add currentRewardHistory.id to td element text
        tdId.text(currentRewardHistory.id);

        // create td element for points_change
        const tdPointsChange = $("<td>");

        // add currentRewardHistory.points_change to td element text
        tdPointsChange.text(currentRewardHistory.points_change);

        // create td element for reward
        const tdReward = $("<td>");

        // check if currentRewardHistory.Reward exists
        if (currentRewardHistory.Reward) {
          // add currentRewardHistory.Reward.reward_name to td element text
          tdReward.text(currentRewardHistory.Reward.reward_name);
        } else {
          tdReward.text("");
        }

        // create td element for createdAt
        const tdCreatedAt = $("<td>");

        // add currentRewardHistory.createdAt to td element text
        // TODO: format date
        tdCreatedAt.text(currentRewardHistory.createdAt);

        // append td elements to tr element
        tr.append(tdId, tdPointsChange, tdReward, tdCreatedAt);

        // append tr element to tbodyRewardHistory
        $("#tbodyRewardHistory").append(tr);
      }

      $("#currentPointsSpan").text(pointTotal);
    });
  }
  // END generateRewardHistory function

  // START generateRewardsCarousel function
  function generateRewardsCarousel() {
    // Get currently logged on company
    const CompanyId = sessionStorage.getItem("CompanyId");

    // call ajax to get all rewards where CompanyId = CompanyId
    var settings = {
      url: "/api/rewards/" + CompanyId,
      method: "GET",
      timeout: 0,
    };

    // START ajax promise
    $.ajax(settings).done(function (arrObjRewards) {
      // START loop through arrObjRewards
      for (let i = 0; i < arrObjRewards.length; i++) {
        // get current reward object
        const objReward = arrObjRewards[i];

        // create li carousel indicator(s) data-slide-to=[i] if i === 0 then .activ
        const liCarouselIndicator = $(
          "<li data-target='#rewardsCarousel' data-slide-to='" + [i] + "'></li>"
        );
        // first elements should have class="active"
        if (i === 0) {
          liCarouselIndicator.addClass("active");
        }

        // append li carousel indicator to ol.carousel-indicators
        $(".carousel-indicators").append(liCarouselIndicator);

        // create div.carousel-item(s) - if i === 0 then .active
        // TODO: make page indicators appear below buttons
        const divCarouselItem = $("<div>");
        if (i === 0) {
          divCarouselItem.addClass("carousel-item active");
        } else {
          divCarouselItem.addClass("carousel-item");
        }

        // create div.card
        const divCard = $("<div class='card'>");

        // create div.card-body
        const divCardBody = $("<div class='card-body'>");

        // create h5.card-title
        const h5CardTitle = $("<h5 class='card-title'>");

        // add objReward.reward_name to h5.card-title
        h5CardTitle.text(objReward.reward_name);

        // create p.card-text
        const pCardText = $("<p class='card-text'>");

        // add objReward.reward_description to p.card-text
        pCardText.text(objReward.reward_description);

        // create a.btn btn-success
        const aBtn = $("<a href='#' class='btn btn-lg btn-success'></a>");

        // TODO: disable aBtn if objReward.active === false

        // add objReward.reward_points to a.btn btn-success
        aBtn.text(objReward.reward_points + "Points\nREDEEM");

        // add objReward.id to aBtn data-id
        aBtn.attr("data-id", objReward.id);

        // add event listener to button
        aBtn.click(function () {
          // get id of current reward
          const rewardId = $(this).attr("data-id");

          // START settings for ajax POST to rewardhistories table
          var settings = {
            url: "/api/rewardhistory/",
            method: "POST",
            timeout: 0,
            // START assign values to to be inserted into rewardhistories
            data: {
              points_change: -Math.abs(parseInt(objReward.reward_points)),
              CustomerId: parseInt(customerId),
              RewardId: parseInt(rewardId),
            },
            // END assign values to to be inserted into rewardhistories
          };
          // END settings for ajax POST to rewardhistories table

          // ajax POST to rewardhistories with defined settings
          $.ajax(settings)

            // START ajax promise callback function
            .done(function (response) {
              // call generateRewardHistory() function
              generateRewardHistory();
            });
          // END ajax promise callback function
        });

        // append h5.card-title to div.card-body
        divCardBody.append(h5CardTitle);

        // append p.card-text to div.card-body
        divCardBody.append(pCardText);

        // append a.btn btn-success to div.card-body
        divCardBody.append(aBtn);

        // append div.card-body to div.card
        divCard.append(divCardBody);

        // append div.card to div.carousel-item
        divCarouselItem.append(divCard);

        // append div.carousel-item to div.carousel-inner
        $(".carousel-inner").append(divCarouselItem);
      }
      // END loop through arrObjRewards
    });
    // END ajax promise
  }
  // END generateRewardsCarousel function

  function redeemButtonClickEvent(aBtn, objReward) {}
});
// END document.ready
