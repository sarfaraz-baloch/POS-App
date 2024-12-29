const express = require("express");
const router = express.Router();
const {
  loginController,
  registerController,
} = require("../controllers/userController");

//Method GET
router.post("/login", loginController);

//Method POST
router.post("/register", registerController);

module.exports = router;
