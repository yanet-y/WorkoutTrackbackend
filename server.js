require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000; 

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

   
    if (process.env.VERCEL !== "1") {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err.message);
  });


app.use("/", require("./routes/authRoutes"));
app.use("/workouts", require("./routes/workoutRoutes"));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});


module.exports = app;
