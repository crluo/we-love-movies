const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function readTheaters(movieId) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*")
        .where({ movie_id: movieId })
}

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

function readReviews(movieId) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ "r.movie_id": movieId })
        .then((reviews) => Object.values(reviews).map(addCritic));
}

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