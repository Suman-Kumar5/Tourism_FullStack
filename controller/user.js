const User = require("../models/user.js")

module.exports.signupRenderForm = (req, res) => {
    res.render("users/signup.ejs");
}


module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}



module.exports.loginRenderForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to WanderLust!")
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) return next(err);
        req.flash("success", "You have been logged out!");
        res.redirect("/listings");
    });
}
