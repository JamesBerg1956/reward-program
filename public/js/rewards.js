// START document.ready
$(document).ready(function () {

    // assign CompanyId to input and generate table
    init();

    // START rewardSubmit.click event listener
    $("#rewardSubmit").click(function(){

        // START settings for ajax post
        var settings = {
            "url": "/api/rewards/",
            "method": "POST",
            "timeout": 0,
            // START values from input elements
            "data": {
              "reward_name": $("#reward_nameInput").val(),
              "reward_description": $("#reward_descriptionInput").val(),
              "reward_points": parseInt(Number($("#reward_pointsInput").val())),
              "active": 1,
              "CompanyId": parseInt(Number($("#CompanyIdInput").val()))
            }
            // END values from input elements
        };
        // END settings for ajax post
          
        // START call ajax POST with defined settings
        $.ajax(settings)
        // promise callback function for ajax POST
        .done(function (reward) {
            // rebuild rewardsTable
            generateRewardsTable();
        });
        // END call ajax POST with defined settings

    });
    // END rewardSubmit.click event listener

    // START init() function
    function init(){
        // add sessionStorage.getItem("CompanyId") to #CompanyIdInput val
        $("#CompanyIdInput").val(sessionStorage.getItem("CompanyId"));

        // call generateRewardTable function
        generateRewardsTable();
    }
    // END init() function

    // START generateRewardTable function
    function generateRewardsTable(){
        
        // START settings for ajax GET request
        var settings = {
            // get all rewards for currently logged company
            "url": "/api/rewards/"+sessionStorage.getItem("CompanyId"),
            "method": "GET",
            "timeout": 0,
        };
        // END settings for ajax GET request

        // call ajax GET with defined settings
        $.ajax(settings)
        // START promise callback function for ajax GET
        .done(function (arrObjRewards) {
            
            // empty contents of #tbodyRewardsTable
            $("#tbodyRewardsTable").empty();

            // START loop through arrObjRewards object array
            for (let i = 0; i < arrObjRewards.length; i++) {
                
                // get current reward object
                const reward = arrObjRewards[i];

                // create tr element
                const tr = $("<tr>");
                    
                // create td element for reward.id
                const tdId = $("<td>");

                // add reward.id to td.text
                tdId.text(reward.id);

                // create td element for reward_name
                const tdRewardname = $("<td>");

                // add reward.reward_name to td.text
                tdRewardname.text(reward.reward_name);

                // create td element for reward_description
                const tdRewardDescription = $("<td>");

                // add reward.reward_description to td.text
                tdRewardDescription.text(reward.reward_description);

                // create td element for reward_points
                const tdRewardPoints = $("<td>");

                // add reward.reward_points to td.text
                tdRewardPoints.text(reward.reward_points);

                // create td element for active
                const tdActive = $("<td>");

                // add reward.active to td.text
                tdActive.text(reward.active);

                // append td elements to tr element
                tr.append(tdId, tdRewardname, tdRewardDescription, tdRewardPoints, tdActive);

                // append tr element to #tbodyRewardsTable
                $("#tbodyRewardsTable").append(tr);
                
            }
            // END loop through arrObjRewards object array

        });
        // END promise callback function for ajax GET

    }
    // END generateRewardTable function

});
// END document.ready