const db = require("../models");
const mongojs = require("mongojs");



module.exports = function(app) {
    // find all workouts
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .then((workouts) => {
            workouts.forEach(workout => {
                workout.calculateDuration();
                workout.lastUpdatedDate();
                console.log(workout);
            })
            res.json(workouts);
        })
        .catch((err) => {
            res.send(err);
        })
    });


    // find workout by range
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .then((workouts) => {
            workouts.forEach(workout => {
                workout.calculateDuration();
                workout.lastUpdatedDate();
                console.log(workout);
            })
            res.json(workouts);
        })
        .catch((err) => {
            res.send(err);
        })
    });


    // create workout 
    app.post("/api/workouts", (req, res) => {
        const workout = new db.Workout(req.body);
        workout.calculateDuration();
        workout.lastUpdatedDate();
        db.Workout.create(workout, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.send(data);
        });
    });

    // add exercise to workout
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findOneAndUpdate({ 
            _id: mongojs.ObjectId(req.params.id)
        }, {
            $push: { 
                exercises: req.body
            }
        })
        .then((workout) => {
            workout.calculateDuration();
            workout.lastUpdatedDate();
            res.send(data);
        })
        .catch((err) => {
            res.send(err);
        });
    });
};