const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/config");
const { bgGreen } = require("colors");
require("colors");

//config
dotenv.config();

//rest obj
const app = express();
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//routes
app.use("/api/item", require("./routes/itemRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/bill", require("./routes/billRoute"));

//listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white.bold);
});
