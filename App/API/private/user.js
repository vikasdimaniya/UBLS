const express = require("express");
const _ = require("lodash");
const router = express.Router();

let runtime;
let log;

function init(core) {
    runtime = core.runtime;
    log = core.log;
    
    router.get("/", user.getUser);
    router.delete("/", user.deleteUser);
    router.put("/", user.updateUser);
    router.get('/home', isLoggedIn, (req, res) => {
        res.redirect("/home.html")
        //res.send(`Home page ${req.user.displayName}`);
    });
}
module.exports = { init: init, router: router };