const express = require("express");
const router = express.Router();
const {
  addBillsController,
  getBillsController,
} = require("../controllers/billController.js");

//Method GET
router.get("/get-bill", getBillsController);

//Method POST
router.post("/add-bill", addBillsController);

module.exports = router;
