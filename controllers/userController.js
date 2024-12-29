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

module.exports = {
  loginController,
  registerController,
};
