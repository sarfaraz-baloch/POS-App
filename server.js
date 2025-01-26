// const express = require("express");
// import App from "./client/src/App";
// const morgan = require("morgan");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/config");
// const { bgGreen } = require("colors");
// const { all } = require("./routes/itemRoute");
// const loanRoutes = require("./routes/loanRoutes"); // Updated to CommonJS
// require("colors");

// //config
// dotenv.config();

// //rest obj
// const app = express();
// connectDB();

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
// app.use("/api/", loanRoutes);

// //listen
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server Running on ${PORT}`.bgCyan.white.bold);
// });

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const path = require("path");
const { bgGreen } = require("colors");
const loanRoutes = require("./routes/loanRoutes");

dotenv.config();

const app = express();
// const __dirname = path.resolve();
console.log(__dirname);
connectDB();

app.use(cors());
app.use(express.json()); // Just this one is enough
app.use(morgan("dev"));

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    // credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// / Serve static files from the React app (or any frontend build)
// app.use(express.static(path.join(__dirname, "client/dist")));

// // Catch-all route for serving the frontend
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// });

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/dist"))); // Serve static files from dist
//   // console.log("===>", __dirname);

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/dist", "index.html")); // Serve index.html for all routes
//   });
// }
if (process.env.NODE_ENV === "production") {
  // Use path.resolve() to resolve the absolute path to the 'dist' folder correctly
  app.use(express.static(path.resolve(__dirname, "client", "dist"))); // Serve static files from dist

  // Catch-all route to serve the index.html for all routes in production
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html")); // Serve index.html for all routes
  });
}

app.use("/api/item", require("./routes/itemRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/bill", require("./routes/billRoute"));
app.use("/api", loanRoutes); // This could be '/api/item' if you want it in that path

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white.bold);
});
