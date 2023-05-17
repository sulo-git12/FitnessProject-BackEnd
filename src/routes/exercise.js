const express = require("express");
const exerciseRouter = express.Router();
const exerciseModel = require("../models/exercise");

// Insert an Exercise
exerciseRouter.post("/", async (req, res) => {
    try {
        const exercise = new exerciseModel(req.body);
        await exercise.save();
        res.status(201).send(exercise);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all Exercises
exerciseRouter.get("/", async (req, res) => {
    try {
        const exercises = await exerciseModel.find({});
        res.status(200).send(exercises);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get Exercise by ID
exerciseRouter.get("/:id", async (req, res) => {
    try {
        const exercise = await exerciseModel.find({ id: req.params.id });
        if (exercise.length === 0) {
            return res.status(404).send("No exercises found");
        }
        res.status(200).send(exercise);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get Exercise by Group
exerciseRouter.get("/group/:group", async (req, res) => {
    try {
        const exercises = await exerciseModel.find({ group: req.params.group });
        if (exercises.length === 0) {
            return res.status(404).send("No exercises found");
        }
        res.status(200).send(exercises);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update an Exercise
exerciseRouter.patch("/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "group", "type", "difficultyLevel", "targetMuscle", "sets", "reps", "rest", "time", "calories", "imageUrl", "videoUrl", "description"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
    }

    try {
        const exercise = await exerciseModel.findById(req.params.id);
        if (!exercise) {
            return res.status(404).send();
        }
        updates.forEach((update) => (exercise[update] = req.body[update]));
        await exercise.save();
        res.send(exercise);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an Exercise
exerciseRouter.delete("/:id", async (req, res) => {
    try {
        const exercise = await exerciseModel.findOne({
            id: req.params.id,
        });

        if (!exercise) {
            let errorObj = {
                message: "The given food id does not match any food on our system",
                statusCode: "NOT FOUND",
            };
            return res.status(404).send(errorObj);
        }

        const deletExercise = await exerciseModel.deleteOne({
            id: req.params.id,
        });
        res.status(200).send("Successfully Deleted!");
    } catch (ex) {
        return res.status(500).send(`Error: ${ex.message}`);
    }
});

module.exports = exerciseRouter;





