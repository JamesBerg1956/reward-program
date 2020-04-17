// I liked having all the html controllers in one spot.  We did not have that many pages so I am not sure if this would need to be addressed if you had a lot more pages??

// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const express = require("express");
const router = express.Router();
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

router.get("/", function (req, res) {
  // If the user already has an account send them to the members page
  console.log("router.get('/'");
  if (req.user) {
    res.redirect("/points");
  }
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/login", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/points");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/signup", function (req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/points");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/points", isAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/points.html"));
});

module.exports = router;
