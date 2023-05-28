const mongoose = require("mongoose");

const customScheduleSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    exerciseId: { type: String, required: true },
});

//  CustomSchedule Model
const CustomSchedule = mongoose.model("customschedules", customScheduleSchema);

module.exports = CustomSchedule;
