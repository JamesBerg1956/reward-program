//  Naming conventions..

// I think I would set this up to have the routes be more descriptive then they are.  For example,
// "/api/company_data/:id"  should be "company_phone/:id

const express = require("express");
const router = express.Router();
const db = require("../models");

// Route for getting some data about our company to be used client side
router.get("/api/company_data/:id", function (req, res) {
  // The company is not logged in, send back an empty object.
  // NOTE: In req.user "user" refers to the method that is identified through the middleware to check to see if a comapny is logged in.  req.user.id is not defined when logging in.
  // console.log(req.user.id);
  // If there is no req.user data (customer object) or the id for the req.user does not equal the id that is requested, pass back an empty object.
  if (!req.user || req.user.id != req.params.id) {
    res.json({});
  } else {
    // This is standard sequelize code.  NOTE: Using "req.params.id" will take the value in the url ":id".  You can also send information through the url query function.  For example, you can request information by saying
    //"http://localhost:8080/api/company_data?id=1".
    // This would be accessed through "req.query.id"
    db.Company.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Rewards],
    })
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(500).json(error));
  }
});
//
module.exports = router;
