const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapSync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const flash = require("connect-flash");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
    index,
    renderNewForm,
    showListing,
    createListing,
    updateListing,
    editListing,
    deleteListing
} = require("../controller/listing.js");

router.route("/")
    .get(wrapAsync(index))
    .post(isLoggedIn, validateListing, wrapAsync(createListing));

router.get("/new", isLoggedIn, renderNewForm);

router.get("/:id", wrapAsync(showListing));

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(editListing));

router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(updateListing));

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;
