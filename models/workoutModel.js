const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  
  workoutName: {
    type: String,
    trim: true,
    required: "workoutName is Required"
  },

  caloriesBurned: {
    type: Number,
    unique:false,
    required: true
  },

  workoutCreated: {
    type: Date,
    default: Date.now
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
