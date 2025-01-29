require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  ssl: true,
  tlsAllowInvalidCertificates: false,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err.message);
    process.exit(1); 
  });


app.use("/", require("./routes/authRoutes"));
app.use("/workouts", require("./routes/workoutRoutes"));


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
