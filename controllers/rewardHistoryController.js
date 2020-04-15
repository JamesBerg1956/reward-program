const express = require("express");
const router = express.Router();
const db = require("../models");

// find all rewardhistory
router.get("/api/rewardhistory/", (req, res) => {
  db.RewardHistory.findAll({})
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

// post a rewardhistory
router.post("/api/rewardhistory/", (req, res) => {
  db.RewardHistory.create(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});
