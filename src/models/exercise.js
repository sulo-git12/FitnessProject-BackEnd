const mongoose = require("mongoose");

// Exercise Schema
const exerciseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, minlength: 5 },
    group: { type: String, required: true },
    type: { type: String, required: true },
    difficultyLevel: { type: Number, required: true },
    targetMuscle: { type: Array, required: true, default: [] },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    rest: { type: Number, required: false },
    time: { type: Number, required: true },
    calories: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    videoUrl: { type: String, required: true },
    description: { type: String, required: false, maxlength: 250 }
});

//  Exercise Model
const Exercise = mongoose.model("exercises", exerciseSchema);

module.exports = Exercise;
