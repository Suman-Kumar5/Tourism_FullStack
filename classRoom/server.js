const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session")
app.use(cookieParser());
const sessionOption = { secret: "mysupersecretstring", resave: false, saveUninitialized: true };
const flash = require("connect-flash");

app.use(session(sessionOption));


app.get("/register", (req, res) => {
    let { name } = req.query;
    req.session.name = name;
    console.log(req.session);
    req.flash("success", "User registered successfull");
    res.redirect("/hello");
})

app.get("/hello", (req, res) => {
    console.log(req.session.name);
    res.send(`Hello,${req.session.name}`);
})

app.get("/test", (req, res) => {
    res.send("Test successfull");
})

app.listen(3000, () => {
    console.log("server is listening to 3000");
})

