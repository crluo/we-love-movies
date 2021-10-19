const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function isIdValid(req, res, next) {
    const movieId = req.params.movieId;
    const foundMovie = await service.read(movieId);
    if (!foundMovie) {
        next({
            status: 404,
            message: `Movie cannot be found.`
        });
    }
    res.locals.movieId = movieId
    res.locals.movie = foundMovie;
    next();
}

async function read(req, res, next) {
    res.json({ data: res.locals.movie });
}

async function readTheaters(req, res, next) {
    const theaters = await service.readTheaters(res.locals.movieId);
    res.json({ data: theaters });
}

async function list(req, res, next) {
    const isShowing = req.query.is_showing;
    const movies = await service.list(isShowing);
    res.json({ data: movies })
}

module.exports = {
    read: [ isIdValid, read ],
    readTheaters: [ isIdValid, readTheaters ],
    list,
}