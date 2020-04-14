const express = require("express");
const router = express.Router();
const db = require("../models");

// find all rewards tied to a business.
router.get("/api/rewards/:id", (req, res) => {
  db.Rewards.findAll({
    where: {
      company_id: req.params.id,
    },
  })
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

// Posts new rewards for a business.
router.post("/api/rewards/", (req, res) => {
  db.Rewards.create(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

// Updates an existing reward.
router.put("/api/rewards/:id", (req, res) => {
  db.Rewards.update(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
