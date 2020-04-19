$(document).ready(function () {

    init();

    // START rewardSubmit.click event listener
    $("#rewardSubmit").click(function(){

        //create settings for ajax post
        var settings = {
            "url": "/api/rewards/",
            "method": "POST",
            "timeout": 0,
            // get values from input elements
            "data": {
              "reward_name": $("#reward_nameInput").val(),
              "reward_description": $("#reward_descriptionInput").val(),
              "reward_points": parseInt(Number($("#reward_pointsInput").val())),
              "active": 1,
              "CompanyId": parseInt(Number($("#CompanyIdInput").val()))
            }
        };
          
        $.ajax(settings).done(function (reward) {
            // rebuild rewardsTable
            generateRewardsTable();
        });

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
        
        

    }
    // END generateRewardTable function

});