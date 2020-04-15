$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/company_data").then(function (data) {
    $(".company_name").text(data.company_name);
  });
});
