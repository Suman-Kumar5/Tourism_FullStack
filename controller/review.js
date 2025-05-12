const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


module.exports.postReview = async (req, res) => {
    let list1 = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    list1.reviews.push(newReview);

    await newReview.save();
    await list1.save();

    console.log("New review saved");
    req.flash("success", "New Review Created");

    res.redirect(`/listings/${list1._id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    // phala listing sa vo review ko remove kea gia h
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    // lakin vo review av v Reviews database ma h. to ab usko vaha sa delete kea jaa rha h
    await Review.findByIdAndDelete(reviewId)
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings`)
}