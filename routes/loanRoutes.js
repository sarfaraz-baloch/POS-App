const express = require("express");
const {
  createLoanRequest,
  getLoanRequests,
} = require("../controllers/loanController");

const router = express.Router();

router.post("/loan-request", createLoanRequest);
router.get("/see-requests", getLoanRequests);

module.exports = router; // Replace export default
