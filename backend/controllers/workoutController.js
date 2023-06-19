const mongoose = require("mongoose");
const HttpError = require("../models/httpError");

const Workout = require("../models/workout");
const workout = require("../models/workout");
const User = require("../models/user");

exports.getAllWorkouts = async (req, res, next) => {
  let workouts;
  try {
    workouts = await Workout.find({ creator: req.user._id }).sort({
      createdAt: -1,
    });
  } catch (err) {
    const error = new HttpError("Could not find workouts " + err, 500);
    return next(error);
  }
  res.json({
    msg: workouts.map((workout) => workout.toObject({ getters: true })),
  });
};

exports.getWorkoutByID = async (req, res, next) => {
  const workoutId = req.params.id;
  let workout;
  try {
    workout = await Workout.findById(workoutId);
  } catch (err) {
    const error = new HttpError("An Error occurred " + err, 500);
    return next(error);
  }

  if (!workout) {
    const error = new HttpError(
      "Cannot find an workout for the entered id",
      404
    );
    return next(error);
  }

  res.json({ msg: workout.toObject({ getters: true }) });
};

exports.postWorkout = async (req, res, next) => {
  const { name, description } = req.body;
  const postedWorkout = new Workout({
    name,
    description,
    creator: req.user._id,
  });


  try {
    await postedWorkout.save();
  } catch (err) {
    const error = new HttpError("Cannot post workout " + err, 500);
    return next(error);
  }
  res.json({ msg: postedWorkout.toObject({ getters: true }) });
};

exports.updateWorkoutById = async (req, res, next) => {
  const { name, description } = req.body;
  const id = req.params.id;

  let workout;
  try {
    workout = await Workout.findById(id);
    workout.name = name;
    workout.description = description;
    await workout.save();
  } catch (err) {
    const error = new HttpError(
      "An Error occurred, try again later " + err,
      500
    );
    return next(error);
  }

  if (!workout) {
    const error = new HttpError("No workouts in given id", 404);
    return next(error);
  }
  res.json({ msg: workout.toObject({ getters: true }) });
};

exports.deleteWorkoutById = async (req, res, next) => {
  const id = req.params.id;

  let workout;
  try {
    workout = await Workout.findById(id);
    await workout.deleteOne()
  } catch (err) {
    const error = new HttpError("Cannot delete, try again later " + err, 500);
    return next(error);
  }

  if (!workout) {
    const error = new HttpError("Could not find workout for this id", 404);
    return next(error);
  }

  res.json({ msg: workout.toObject({ getters: true }) });
};
