const express = require("express");
const workoutController = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", workoutController.getAllWorkouts);

router.get("/:id", workoutController.getWorkoutByID)

router.post("/", workoutController.postWorkout);

router.patch("/:id", workoutController.updateWorkoutById);

router.delete("/:id", workoutController.deleteWorkoutById);

module.exports = router;
