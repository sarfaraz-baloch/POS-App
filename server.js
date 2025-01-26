// const express = require("express");
// const morgan = require("morgan");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/config");
// const { bgGreen } = require("colors");
// const { all } = require("./routes/itemRoute");
<<<<<<< HEAD
// const loanRoutes = require("./routes/loanRoutes"); // Updated to CommonJS
=======
// const path = require("path");
>>>>>>> 8ad503b522da4841535ed3dfdefc051da628b14a
// require("colors");

// //config
// dotenv.config();

// //rest obj
// const app = express();
// connectDB();

<<<<<<< HEAD
=======
// const corsOptions = {
//   origin: process.env.CLIENT_URL,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   // credentials: true,
// };

// app.use(cors(corsOptions));

>>>>>>> 8ad503b522da4841535ed3dfdefc051da628b14a
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
<<<<<<< HEAD
// app.use("/api/", loanRoutes);
=======

// // Serve static files from React app
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));

//   // Catch-all route to send all requests to React's index.html (client-side routing)
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }
>>>>>>> 8ad503b522da4841535ed3dfdefc051da628b14a

// //listen
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server Running on ${PORT}`.bgCyan.white.bold);
// });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
<<<<<<< HEAD
const { bgGreen } = require("colors");
const loanRoutes = require("./routes/loanRoutes");

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // Just this one is enough
app.use(morgan("dev"));

=======
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
>>>>>>> 8ad503b522da4841535ed3dfdefc051da628b14a
app.use("/api/item", require("./routes/itemRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/bill", require("./routes/billRoute"));
app.use("/api", loanRoutes); // This could be '/api/item' if you want it in that path

<<<<<<< HEAD
=======
// Serve static files (for React frontend)
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

console.log("Path module loaded successfully:", path);
console.log("Build directory path:", path.join(__dirname, "client/build"));

// Listen
>>>>>>> 8ad503b522da4841535ed3dfdefc051da628b14a
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white.bold);
});
