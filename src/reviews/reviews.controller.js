const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * verifies review id or responds with error if not found
 * 
 */
async function reviewExists(req, res, next) {
    const reviewId = req.params.reviewId;
    const foundReview = await service.read(reviewId);
    if (!foundReview) {
        next({
            status: 404,
            message: `Review cannot be found.`
        });
    }
    res.locals.reviewId = reviewId;
    res.locals.review = foundReview;
    next();
}

/**
 * updates an existing review and responds with the updated review 
 */
async function update(req, res, next) {
    let updatedReview = {
        ...res.locals.review,
        ...req.body.data,
    };
    await service.update(updatedReview);
    updatedReview = await service.updateReviewWithCritic(res.locals.reviewId);
    res.json({ data: updatedReview });
}
/**
 * deletes an existing review and responds with 204 status on completion
 */
async function destroy(req, res, next) {
    await service.destroy(res.locals.reviewId);
    res.sendStatus(204);
}

module.exports = {
    update: [ asyncErrorBoundary(reviewExists), update ],
    destroy: [ asyncErrorBoundary(reviewExists), destroy ],
}
