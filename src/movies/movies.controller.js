const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



async function read(req, res, next) {
    const movieId = req.params.movieId;
    const foundMovie = await service.read(movieId);
    res.json({ data: foundMovie });
}

async function list(req, res, next) {
    const allMovies = await service.list();
    res.json({ data: allMovies })
}

module.exports = {
    read,
    list,
}