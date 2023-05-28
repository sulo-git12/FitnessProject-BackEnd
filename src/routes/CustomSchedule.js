const express = require("express");
const async = require("async");
const customscheduleRouter = express.Router();
const customscheduleModel = require("../models/CustomSchedule");
const exerciseModel = require("../models/exercise");

// Custom schedule exercise by user id
customscheduleRouter.get("/:userId", async (req, res) => {
    try {
        const customScheduleExercises = await customscheduleModel
            .find({
                userId: req.params.userId,
            });

        if (customScheduleExercises.length === 0) {
            return res.status(404).send("Error Pass");
        }

        const customSchedule = await async.map(
            customScheduleExercises,
            async (exercise) => {
                return await exerciseModel.findOne({ id: exercise.exerciseId }).select({
                    name: 1,
                    sets: 1,
                    reps: 1,
                    rest: 1,
                    imageUrl: 1,
                    id: 1,
                    group: 1,
                    type: 1,
                    difficultyLevel: 1,
                    targetMuscle: 1,
                    time: 1,
                    calories: 1,
                    videoUrl: 1,
                    description: 1
                });
            }
        );

        res.status(200).send(customSchedule);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = customscheduleRouter;
