const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now()
  },
  totalDuration: {
    type: Number
  },
  lastUpdated: {
    type: Date
  },
  exercises: [{}]
});

WorkoutSchema.methods.calculateDuration = function() {
  this.totalDuration = 0;
  this.exercises.forEach(exercise => {
    if (exercise.duration) {
      this.totalDuration += exercise.duration;
    }
  });
  return this.totalDuration;
};

WorkoutSchema.methods.lastUpdatedDate = function() {
  this.lastUpdated = Date.now();
  return this.lastUpdated;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;