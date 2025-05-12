const express = require("express");
const router = express.Router();
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapSync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signup, signupRenderForm, loginRenderForm, login, logout } = require("../controller/user.js");


router.get("/signup", signupRenderForm)

router.post("/signup", wrapAsync(signup))

router.get("/login", loginRenderForm)

router.post("/login", saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login", failureFlash: true
}), login);

router.get("/logout", logout);

module.exports = router;