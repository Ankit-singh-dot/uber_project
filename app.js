const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const userRoutes = require("./routes/user.routes");

app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("hello world");
});
module.exports = app;
