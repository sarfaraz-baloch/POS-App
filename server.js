// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/config");
// const { bgGreen } = require("colors");
// const { all } = require("./routes/itemRoute");
// const path = require("path");
// require("colors");

// //config
// dotenv.config();

// //rest obj
// const app = express();
// connectDB();

// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   // credentials: true,
// };

// app.use(cors(corsOptions));

// //middlewares
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(morgan("dev"));

// //routes
// app.use("/api/item", require("./routes/itemRoute"));
// app.use("/api/user", require("./routes/userRoute"));
// app.use("/api/bill", require("./routes/billRoute"));

// // Serve static files from React app
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));

//   // Catch-all route to send all requests to React's index.html (client-side routing)
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

// //listen
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server Running on ${PORT}`.bgCyan.white.bold);
// });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/config");
const path = require("path"); // Add this line to import the path module

require("colors");

// Config
dotenv.config();

// Rest obj
const app = express();
connectDB();

// CORS options
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/api/item", require("./routes/itemRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/bill", require("./routes/billRoute"));

// Serve static files (for React frontend)
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white.bold);
});
