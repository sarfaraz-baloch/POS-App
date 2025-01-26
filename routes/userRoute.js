const express = require("express");
const router = express.Router();
const {
  loginController,
  registerController,
  getAllUsersController,
} = require("../controllers/userController");

//Method GET
router.post("/login", loginController);

//Method POST
router.post("/register", registerController);

//Method GET
router.get("/all-users", getAllUsersController);

module.exports = router;
