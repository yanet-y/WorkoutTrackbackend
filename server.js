const cors = require("cors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const corsOptions = {
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); 
app.use(express.json());


const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App connected to database");
    console.log(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use("/", require("./routes/authRoutes"));
app.use("/workouts", require("./routes/workoutRoutes"));

module.exports = app;
