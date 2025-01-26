const mongoose = require("mongoose");

const loanRequestSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  initialDeposit: { type: Number, required: true },
  loanPeriod: { type: Number, required: true },
  totalLoan: { type: Number, required: true },
  monthlyInstallment: { type: Number, required: true },
  requestedAt: { type: Date, default: Date.now },
});

const LoanRequest = mongoose.model("LoanRequest", loanRequestSchema);

module.exports = LoanRequest;
