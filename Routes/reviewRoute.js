const express = require('express')
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Review = require('../models/review')

const Campground = require('../models/campground')
const CatchError = require('../utilitis/CatchAsync');
const ExpressError = require('../utilitis/ExpressError')
const CatchAsync = require('../utilitis/CatchAsync')
const Reviews = require('../controllerrs/reviews')

router.post('/', isLoggedIn, validateReview, CatchAsync(Reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, CatchAsync(Reviews.deleteReview))

module.exports = router;