const express = require('express');
const Router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const CatchAsync = require('../utilitis/CatchAsync');
const Users = require('../controllerrs/users')

Router.route('/register')
    .get(Users.getRegister)
    .post(CatchAsync(Users.postRegister))

Router.route('/login')
    .get(Users.getLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), Users.postLogin)

Router.get("/logout", Users.logout);

module.exports = Router;