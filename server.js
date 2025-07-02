const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const userRoutes =require("./routes/userRoutes");
dotenv.config();

connectDb();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/users", require("./routes/userRoutes"));
app.use("/transactions", require("./routes/transactionRoute"));


const PORT = 5000|| process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});