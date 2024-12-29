const itemModel = require("../models/itemModel.js");
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find({});
    res.status(200).send(items);
    // console.log(items);
  } catch (error) {
    console.log(error);
  }
};

const addItemsController = async (req, res) => {
  try {
    const item = new itemModel(req.body);
    await item.save();
    res.status(201).send("item Added successfully");
  } catch (error) {
    res.status(400).send(error, "error");
    console.log(error);
  }
};

const editItemController = async (req, res) => {
  try {
    await itemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send("item updated successfully");
    console.log("item updated successfully");
  } catch (error) {
    res.status(400).send(error, "error");
    console.log(error);
  }
};

const deleteItemController = async (req, res) => {
  try {
    const { itemId } = req.body;
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).send("item deleted successfully");
    console.log("item deleted successfully");
  } catch (error) {
    res.status(400).send(error, "error");
    console.log(error);
  }
};

module.exports = {
  getItemController,
  addItemsController,
  editItemController,
  deleteItemController,
};
