const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv/config");

const app = express();

//Import routes
const postsRoute = require("./routes/posts");

//Middlewares
app.use("/posts", postsRoute);
app.use(bodyParser.json());
app.use(cors());

// ROUTES
app.get("/", (_req, res) => {
  res.send("We are on the home page!");
});

//Connect to db
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected!"))
  .catch(() => console.log("Error to connecting database!"));

//Listen to the server
app.listen(3000, () => console.log("server is running up!"));
