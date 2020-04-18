$(document).ready(function () {
  $.get("/api/login", {})
    .then(function (response) {
      console.log("Here2");
    })
    .catch(function (err) {
      console.log(err);
    });
});
