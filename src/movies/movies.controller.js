const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function isIdValid(req, res, next) {
    const movieId = req.params.movieId;
    const foundMovie = await service.read(movieId);
    if (!foundMovie) {
        console.log(!foundMovie)
        next({
            status: 404,
            message: `Movie Id ${movieId} not found.`
        });
    }
    next();
}

async function read(req, res, next) {
    const movieId = req.params.movieId;
    const foundMovie = await service.read(movieId);
    res.json({ data: foundMovie });
}

async function list(req, res, next) {
    const isShowing = req.query.is_showing;
    const movies = await service.list(isShowing);
    res.json({ data: movies })
}

module.exports = {
    read: [ isIdValid, read ],
    list,
}