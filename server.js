const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Coneected"));
mongoose.connection.on("error", err => {
  console.log(`DB connection error ${err.msg}`);
});
const port = process.env.PORT || 3000;
const postRoutes = require("./routes/post");
app.use(expressValidator());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", postRoutes);
app.listen(port, () => {
  console.log("server started");
});
