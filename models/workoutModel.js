const mongoose = require("mongoose");
const exerciseSchema = require("./exerciseModel.js");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date
  },

  exercises: {
    type: [ExerciseSchema]
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;