const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const seeders = require("./seeders/seed.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethods", { useNewUrlParser: true });

// find workout by range
app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});


// create workout 
app.post("/api/workouts", (req, res) => {
    db.Workout.insert(req.body, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

// add exercise to workout
app.put("/api/workouts/:id", (req, res) => {
    db.Workout.update({
        _id: mongojs.ObjectId(req.params.id)
    }, {
        $push: {
            exercises: req.body
        }, 
        $set: {
            date: Date.now()
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});