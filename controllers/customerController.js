const express = require("express");
const router = express.Router();
const db = require("../models");

// find all customers
router.get("/api/customer/", (req, res) => {
    db.Customer.findAll({
      
    })
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(500).json(error));
  });

// find a single customer
router.get("/api/customer/:phone", (req, res) => {
    db.Customer.findAll({
      where: {
        phone: req.params.phone,
      },
    })
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(500).json(error));
  });

// post a customer
router.post("/api/customer/", (req, res) => {
    db.Customer.create(req.body)
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(500).json(error));
  });