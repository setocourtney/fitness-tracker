const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    type: {
        type: String,
    required: "Type is required"
    },
    name: {
        type: String,
        required: "Name is required"
    },
    duration:{
        type: Number,
        min: [0, "Must be a postive number"]
    },
    weight: {
        type: Number,
        min: [0, "Must be a postive number"]
    },
    reps: {
        type: Number,
        min: [0, "Must be a postivie number"]
    },
    sets: {
        type: Number,
        min: [0, "Must be a postivie number"]
    },
    distance: {
        type: Number,
        min: [0, "Must be a postivie number"]
    }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;