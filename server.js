const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./workoutModel.js");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethods", { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

// get all workouts
app.get("/all", (req, res) => {
    Workouts.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

// add workout to list
app.submit("/", (req, res) => {
    Workouts.insert(req.body, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

// find workout by id
app.get("/find/:id", (req, res) => {
    Workouts.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

// modify existing workout list
app.put("/update/:id", (req, res) => {
    Workouts.update({
        _id: mongojs.ObjectId(req.params.id)
    }, {
        $set: {
            title: req.body.title,
            description: req.body.discription,
            modified: Date.now()
        }
    }, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

// clear workout by id
app.delete("/delete/:id", (req, res) => {
    Workouts.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

// clear all workouts
app.delete("/clear", (req, res) => {
    Workouts.remove({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});s