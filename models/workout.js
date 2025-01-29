const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  load: { type: Number, required: true },
  reps: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Workout", WorkoutSchema);
