const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDb();

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Import routes
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoute");

// Use routes
app.use("/users", userRoutes); // ✅ use imported userRoutes
app.use("/transactions", transactionRoutes); // ✅ use imported transactionRoutes

// PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
