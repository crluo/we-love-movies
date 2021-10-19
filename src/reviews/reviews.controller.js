const service = require("./reviews.service");

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

async function update(req, res, next) {
    let updatedReview = {
        ...res.locals.review,
        ...req.body.data,
    };
    await service.update(updatedReview);
    updatedReview = await service.updateReviewWithCritic(res.locals.reviewId);
    res.json({ data: updatedReview });
}

async function destroy(req, res, next) {
    await service.destroy(res.locals.reviewId);
    res.sendStatus(204);
}

module.exports = {
    update: [ reviewExists, update ],
    destroy: [ reviewExists, destroy ],
}
