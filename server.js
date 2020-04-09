const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");  // log server requests

// set up mongo db
const databaseUrl = "fitnessTrackerDB";
const collections = ["workouts"];
const db = mongojs(databaseUrl, collections);

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

db.on("error", error => {
    console.log("Database Error:", error);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
});

// get all workouts
app.get("/all", (req, res) => {
    db.workouts.find({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.json(data);
    });
});

// add workout to list
app.submit("/", (req, res) => {
    db.workouts.insert(req.body, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

// find workout by id
app.get("/find/:id", (req, res) => {
    db.workouts.findOne({
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
    db.workouts.update({
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
    db.workouts.remove({
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
    db.workouts.remove({}, (err, data) => {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log("App running on port 3000!");
  });s