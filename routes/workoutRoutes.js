const express = require("express");
const jwt = require("jsonwebtoken");
const Workout = require("../models/workout");

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Get  Workouts
router.get("/", authMiddleware, async (req, res) => {
  const workouts = await Workout.find({ user: req.user.userId });
  res.json(workouts);
});

// Add Workout
router.post("/", authMiddleware, async (req, res) => {
  const { title, load, reps } = req.body;
  const newWorkout = new Workout({ user: req.user.userId, title, load, reps });
  await newWorkout.save();
  res.json(newWorkout);
});

// Delete Workout
router.delete("/:id", authMiddleware, async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.json({ message: "Workout deleted" });
});

module.exports = router;
