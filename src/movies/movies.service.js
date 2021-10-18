const knex = require("../db/connection");

function read(movieId) {
    return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function list() {
    return knex("movies").select("*");
}

module.exports = {
    read,
    list,
}