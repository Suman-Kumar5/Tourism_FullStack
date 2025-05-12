const mongoose = require("mongoose");
const schema = mongoose.Schema;
const review = require("./review.js")

const listingSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "../img/sunset.jpg" // Default image URL
        }
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: { $in: listing.reviews } })
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;