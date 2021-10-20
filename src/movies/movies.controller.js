const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * verifies movie id or responds with error if not found
 */
async function isIdValid(req, res, next) {
    const movieId = req.params.movieId;
    const foundMovie = await service.read(movieId);
    if (!foundMovie) {
        next({
            status: 404,
            message: `Movie cannot be found.`
        });
    }
    res.locals.movieId = movieId;
    res.locals.movie = foundMovie;
    next();
}
/**
 * responds with movie with specified id
 */
async function read(req, res, next) {
    res.json({ data: res.locals.movie });
}
/**
 * responds with theaters that are showing specified movie
 */
async function readTheaters(req, res, next) {
    const theaters = await service.readTheaters(res.locals.movieId);
    res.json({ data: theaters });
}
/**
 * responds with reviews from specified movie
 */
async function readReviews(req, res, next) {
    const reviews = await service.readReviews(res.locals.movieId);
    res.json({ data: reviews });
}
/**
 * responds with list of all movies or just movies that are currently showing
 */
async function list(req, res, next) {
    const isShowing = req.query.is_showing;
    const movies = await service.list(isShowing);
    res.json({ data: movies })
}

module.exports = {
    read: [ asyncErrorBoundary(isIdValid), read ],
    readTheaters: [ asyncErrorBoundary(isIdValid), readTheaters ],
    readReviews: [ asyncErrorBoundary(isIdValid), readReviews ],
    list,
}