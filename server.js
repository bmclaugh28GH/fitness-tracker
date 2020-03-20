// **********************************************
// boilerplate
// **********************************************

const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const Workout = require("./models/workoutModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

// **********************************************
// get all workouts 
// **********************************************

app.get("/all", (req, res) => {
  console.log("here i am"); 
  Workout.find({})
    .then(dbWorkout => {
      console.log(dbWorkout); 
      res.json(dbWorkout);
    })
    .catch(err => {
      console.log("error"); 
      res.json(err);
    });
});

// **********************************************
// INSERT 
// **********************************************

//app.post("/submit", ({ body }, res) => {

app.post("/submit",  ({ body }, res) => {
  console.log(body);

  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// **********************************************
// DELETE  
// **********************************************

app.delete("/delete/:id", (req, res) => {
  console.log ("deleting id " + req.params.id); 
  Workout.remove(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// **********************************************
// LISTEN  
// **********************************************

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
