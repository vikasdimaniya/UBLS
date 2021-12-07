const express = require("express");
const _ = require("lodash");
const router = express.Router();
const passport = require('passport');

let runtime;
let log;

function init(core) {
    runtime = core.runtime;
    log = core.log;

    //router.use("/signup", runtime.singupLocal);
    //router.post("/login", runtime.auth.local.login);
    router.post('/localStrategy', 
        passport.authenticate('local', {
            successRedirect: '/home.html',
            failureRedirect: '/index.html' 
        }
    ));
    router.get('/google',
        passport.authenticate('google', { scope: [ 'email', 'profile' ] })
    );
    router.get('/google/callback',
        passport.authenticate( 'google', {
            successRedirect: '/home.html',
            failureRedirect: '/index.html'
        })
    );
    router.get('/failure', (req, res) => {
        res.send('Failed to authenticate..');
    });
    router.get('/logout', (req, res) => {
        req.logout();
        req.session.destroy();
        res.redirect("/index.html");
    });
}
module.exports = { init: init, router: router };