const express = require("express");
const router = express.Router();
const {
  getItemController,
  addItemsController,
  editItemController,
  deleteItemController,
} = require("../controllers/itemContoler");

//Method GET
router.get("/get-item", getItemController);

//Method POST
router.post("/add-item", addItemsController);

//Methot Put
router.put("/edit-item", editItemController);

//Method Delete
router.post("/delete-item", deleteItemController);

module.exports = router;
