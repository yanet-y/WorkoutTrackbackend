require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();


app.use(express.json());
app.use(cors());


connectDB();


app.use("/", require("./routes/authRoutes"));
app.use("/workouts", require("./routes/workoutRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
