// Requiring our models and passport as we've configured it
const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/passport");
//var nodemailer = require("../helper/email");

// Using the passport.authenticate middleware with our local strategy.
// If the company has valid login credentials, send them to the members page.
// Otherwise the company will be sent an error
router.post("/api/login", passport.authenticate("local"), function (req, res) {
  res.json(req.user);
});

// Route for signing up a company. The company's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize company Model. If the company is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function (req, res) {
  db.Company.create({
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    company_name: req.body.company_name,
    active: req.body.active,
  })
    .then(function () {
      //    nodemailer.sendEmail(req.body.email); SMH
      res.redirect(307, "/api/login");
    })
    .catch(function (err) {
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
