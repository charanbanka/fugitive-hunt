const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const dataRoutes = require("./routes/data");
const criminalRoutes = require("./routes/check-criminal");

const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());

// Set Cross-Origin-Resource-Policy header for all responses
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Environment variables
const PORT = 8080;

// Serve static files with appropriate headers
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Default route for testing
app.get("/health", (req, res) => {
  res.send({ status: "ok", message: "Server is healthy" });
});

app.use("/api", dataRoutes);
app.use("/api", criminalRoutes);


// Database connection
app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
