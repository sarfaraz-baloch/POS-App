const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const itemModel = require("./models/itemModel");
const items = require("./utils/data");
require("colors");

dotenv.config();
connectDB();

const importdata = async () => {
  try {
    await itemModel.deleteMany();
    await itemModel.insertMany(items);
    console.log("Data Imported".bgGreen.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.bgRed.inverse);
    process.exit(1);
  }
};

importdata();
