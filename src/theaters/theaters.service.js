const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

/**
 * function to add all movies showing at a particular theater as a nested object
 */
const addMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    image_url: ["movies", null, "image_url"],
    is_showing: ["movies", null, "is_showing"],
    theater_id: ["movies", null, "theater_id"]
});
/**
 * returns theaters with all movies showing as nested object for each theater
 */
function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")  
    .then((theaters) => addMovies(theaters));
}

module.exports = {
    list,
}