const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

/**
 * function to map critic properties to a nested critic object
 */
const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

/**
 * queries for an individual review
 * @param {String} reviewId 
 * @returns review with specified review_id
 */
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}
/**
 * updates existing review
 * @param {Object} updatedReview object with updated review body
 * @returns review with updated contents
 */
function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id})
    .update(updatedReview, "*")
}
/**
 * adds critic info as a nested object
 * @param {String} reviewId 
 * @returns review object with added critic info
 */
function updateReviewWithCritic(reviewId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ review_id: reviewId })
    .first()
    .then(addCritic);
}
/**
 * deletes a review with specified reviewId
 * @param {String} reviewId id of review to delete
 * @returns 204 status upon completion
 */
function destroy(reviewId) {
  return knex("reviews as r")
    .where({ review_id: reviewId })
    .del();
}

module.exports = {
  read,
  update,
  updateReviewWithCritic,
  destroy,
}