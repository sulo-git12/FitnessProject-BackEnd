const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

//Add Routes
const exerciseRouter = require("./src/routes/exercise");

//Add Paths
app.use(cors());
app.use(express.json());
app.use("/api/exercises", exerciseRouter);

//Config .env
dotenv.config();

// Declare a  Runing PORT
const PORT = 8088;

// Check runing port
app.listen(PORT, () => {
    console.log(`Successfully runing on Port : ${PORT}`);
});

// Mongo DB Connections
mongoose
    .set("strictQuery", false)
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to mongodb !"))
    .catch((err) => console.log(`An Error has occured: ${err}`));