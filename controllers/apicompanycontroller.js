const express = require("express");
const router = express.Router();
const db = require("../models");

// Business Table management
//
// Gets data from a single business with all their reward information.
router.get("/api/company/:id", (req, res) => {
  db.Company.findOne({
    where: {
      id: req.params.id,
    },
    include: [db.Rewards],
  })
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
