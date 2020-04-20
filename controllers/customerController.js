//  Naming conventions..

// I think I would set this up to have the routes be more descriptive then they are.  For example,
// "/api/customer/"  should be "/Customers/""
// "/api/customer/:phone"  should be "/customer_phone" (maybe /get/customer_phone)
// "/api/customer/"  should be "/post/customer/"

// naming things pluralized when they should be can be an easy indication of expected results.

const express = require("express");
const router = express.Router();
const db = require("../models");

// find all customers for a comapny
router.get("/api/customer/:CompanyId", (req, res) => {
  db.Customer.findAll({
    where: {
      CompanyId: req.params.CompanyId,
    },
    order: [["id", "DESC"]],
  })
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

// find a single customer
router.get("/api/customerPhone/:phone", (req, res) => {
  db.Customer.findAll({
    where: {
      phone: req.params.phone,
    },
  })
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

// post a customer
router.post("/api/customer", (req, res) => {
  console.log("/api/customer/");
  // If they are not logged in, req.user.id will be undefined.  Then when we set it to req.body.CompanyID and send it to create the record, it will fail due to the req.body.CompanyID cannot be null.
  req.body.CompanyId = req.user.id;
  console.log(req.body);
  db.Customer.create(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
