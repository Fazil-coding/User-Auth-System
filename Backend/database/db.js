require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database is successfully connected"))
  .catch((err) => console.log("Database is not Connected " + err));
