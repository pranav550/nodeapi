const express = require("express");
const app = express();
const port = process.env.Port || 3000;
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.Mongo_Url, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected"));
mongoose.connection.on("error", err =>
  console.log(`DB connection error ${err.message}`)
);
const postRoutes = require("./routes/post");
app.use("/", postRoutes);

app.listen(port, () => {
  console.log("server started");
});
