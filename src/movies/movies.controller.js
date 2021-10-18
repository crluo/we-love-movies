const service = require("./movies.service");

async function read(req, res, next) {
    const movieId = req.params.movieId;
    const foundMovie = await service.read(movieId);
    res.json({ data: foundMovie });
}

module.exports = {
    read,
}