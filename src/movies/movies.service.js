const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

/**
 * function to map critic properties to a nested critic object
 */
const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

/**
 * queries for an individual movie
 * @param {String} movieId of movie to show
 * @returns movie with specified movie_id
 */
function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}
/**
 * queries theaters that show a specified movie_id
 * @param {String} movieId of movie to see theaters
 * @returns theaters that show specified movie
 */
function readTheaters(movieId) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*")
        .where({ movie_id: movieId })
}

/**
 * queries for reviews of an individual movie
 * @param {String} movieId of movie to read reviews for
 * @returns reviews for specified movie with critic info as a nested object
 */
function readReviews(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ "r.movie_id": movieId })
        .then((reviews) => Object.values(reviews).map(addCritic));
}

/**
 * lists movies based on whether it is showing or all movies in db
 * @param {Boolean} isShowing indicates whether to list all movies or just those that are currently showing
 * @returns movies based on query parameter
 */
function list(isShowing) {
    if (isShowing) {
      return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")  
        .select("mt.*")
        .where({is_showing: true})
        .groupBy("mt.movie_id");
    }
    return knex("movies").select("*");
}

module.exports = {
    read,
    readTheaters,
    readReviews,
    list,
}