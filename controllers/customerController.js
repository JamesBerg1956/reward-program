//  Naming conventions..

// I think I would set this up to have the routes be more descriptive then they are.  For example,
// "/api/customer/"  should be "/Customers/""
// "/api/customer/:phone"  should be "/customer_phone" (maybe /get/customer_phone)
// "/api/customer/"  should be "/post/customer/"

// naming things pluralized when they should be can be an easy indication of expected results.

const express = require("express");
const router = express.Router();
const db = require("../models");

// find all customers
router.get("/api/customer/", (req, res) => {
  console.log('router.get("/api/customer/"');
  db.Customer.findAll({})
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
  // If they are not logged in, req.user.id will be undefined.  Then when we set it to req.body.CompanyID and send it to create the record, it will fail due to the req.body.CompanyID cannot be null.
  req.body.CompanyID = req.user.id;
  db.Customer.create(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
