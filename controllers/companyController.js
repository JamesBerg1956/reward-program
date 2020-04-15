const express = require("express");
const router = express.Router();
const db = require("../models");

// Route for getting some data about our company to be used client side
router.get("/api/company_data", function (req, res) {
  if (!req.company) {
    // The company is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the company's email and id
    // Sending back a password, even a hashed password, isn't a good idea
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
