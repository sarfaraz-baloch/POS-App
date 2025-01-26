const userModel = require("../models/userModel.js");

const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await userModel.findOne({
      userId,
      password,
      verified: true,
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.json({ message: "user not found", user });
    }
    // console.log(items);
  } catch (error) {
    console.log(error);
  }
};

const registerController = async (req, res) => {
  try {
    const newUser = new userModel({ ...req.body, verified: true });
    await newUser.save();
    res.status(201).send("user registered successfully");
  } catch (error) {
    res.status(400).send(error, "error");
    console.log(error);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    // Find all users in the database
    const users = await userModel.find(); // This will return all users in the collection

    if (users.length > 0) {
      // If users exist, return them
      res.status(200).json(users);
    } else {
      // If no users found
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    // Catch any error that occurs and send it back
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  loginController,
  registerController,
  getAllUsersController,
};
