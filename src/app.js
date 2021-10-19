if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const moviesRouter = require("./movies/movies.router");

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);

// not found handler
app.use((req, res, next) => {
    next({ status: 404, message: `Not found: ${req.originalUrl}`})
});

// error handler
app.use((error, req, res, next) => {
    console.log(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;