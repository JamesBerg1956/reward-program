const express = require("express");
const router = express.Router();
const db = require("../models");

// find all rewardhistory
router.get("/api/rewardhistory/", (req, res) => {
  db.rewardhistory
    .findAll({})
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

// find rewardhistory for single customer
router.get("/api/rewardhistory/:customer_id", (req, res) => {
  db.rewardhistory
    .findAll({
      where: {
        CustomerId: req.params.customer_id,
      },
      include: [db.Rewards],
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// post a rewardhistory.
router.post("/api/rewardhistory/", (req, res) => {
  db.rewardhistory
    .create(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});
module.exports = router;
