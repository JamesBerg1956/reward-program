//  Naming conventions..

// I think I would set this up to have the routes be more descriptive then they are.  For example,
// "/api/login" MAYBE should be just "/login"
// "/api/signup" MAYBE should be "/signup"
// "/logout" I like

//Not sure naming it "api/..." gave any advantage (these are all APIs)

// Requiring our models and passport as we've configured it
const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/passport");
//var nodemailer = require("../helper/email");  SMH

// This post route checks to see if the user is logged in.  If so, it will set the res.json to the login information.  If not, it will error out.  NOTE: The line of code
// "passport.authenticate("local")
// will call the passport.js file and try and authenticate.  If it does not, it WILL NOT set res.json(req.user).  In fact it will not even run this line of code.
router.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

// Route for signing up a company. The company's password is automatically hashed
// how we configured our Sequelize company Model. If the company is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function (req, res) {
  console.log("Trying to post");
  db.Company.create({
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    company_name: req.body.company_name,
    active: req.body.active,
  })
    .then(function () {
      // We are redirected to "/api/login" because we need to get the JSON data to send back to the browser.
      res.redirect(307, "/api/login");
    })
    .catch(function (err) {
      console.log("caught the error");
      res.status(401).json(err);
    });
});
//
// Route for logging company out
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
