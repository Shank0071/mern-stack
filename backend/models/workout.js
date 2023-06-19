const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true, minLength: 5 },
  creator: {type: mongoose.Types.ObjectId, required: true},
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Workout", workoutSchema);

       