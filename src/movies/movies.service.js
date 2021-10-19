const knex = require("../db/connection");

function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function list(isShowing) {
    if (isShowing) {
      return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")  
        .select("mt.*")
        .where({is_showing: true})
        .groupBy("mt.movie_id");
    }
    console.log(isShowing)
    return knex("movies").select("*");
}

module.exports = {
    read,
    list,
}