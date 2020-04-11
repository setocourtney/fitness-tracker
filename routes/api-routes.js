const db = require("../models");
const mongojs = require("mongojs");



module.exports = function(app) {
    // find all workouts
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        })
    });


    // find workout by range
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        })
    });


    // create workout 
    app.post("/api/workouts", (req, res) => {
        db.Workout.create({}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.send(data);
        });
    });

    // add exercise to workout
    app.put("/api/workouts/:id", (req, res) => {
        console.log(req.body);
        db.Workout.findOneAndUpdate(
            { 
                _id: mongojs.ObjectId(req.params.id)
            }, 
            { 
                $push: { 
                    exercises: req.body
                } 
            }, (err, data) => {
                if (err) {
                    res.send(err);
                }
                res.send(data);
            });
    });

};
