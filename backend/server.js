const cors = require("cors");
require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes)

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured" });
});


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x3isozm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(() => {
  console.log("DATABASE CONNECTED");
  app.listen(4000, () => {
    console.log("Listening to port 4000")
  })
}).catch((err) => {
  console.log(`Some error occurred ${err}`)
})
