const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapSync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn } = require("../middleware.js");
const { postReview, deleteReview } = require("../controller/review.js");


const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg);
    }
    else {
        next();
    }
}


//Review
//Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(postReview))

// delete review route
router.delete("/:reviewId", isLoggedIn, wrapAsync(deleteReview))

module.exports = router;