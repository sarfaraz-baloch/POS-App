const billModel = require("../models/billModel.js");

const addBillsController = async (req, res) => {
  try {
    const newbill = new billModel(req.body);
    await newbill.save();
    res.status(201).send("bill Created successfully");
    // console.log(items);
  } catch (error) {
    console.log(error);
  }
};

const getBillsController = async (req, res) => {
  try {
    const bill = await billModel.find();
    res.status(200).send(bill);
    // console.log(items);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addBillsController,
  getBillsController,
};
