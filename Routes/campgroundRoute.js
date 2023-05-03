const express = require('express')
const router = express.Router();
const Campground = require('../models/campground')
const CatchError = require('../utilitis/CatchAsync');
const CatchAsync = require('../utilitis/CatchAsync')
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const Campgrounds = require('../controllerrs/campgrounds');

const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage });

router.route('/')
    .get(CatchAsync(Campgrounds.index))
    .post(isLoggedIn,  upload.array('image'), validateCampground, CatchAsync(Campgrounds.createNewForm))

router.get('/new', isLoggedIn, Campgrounds.renderNewForm)

router.route('/:id')
    .get(CatchAsync(Campgrounds.getId))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, CatchAsync(Campgrounds.putId))
    .delete(isLoggedIn, isAuthor, CatchAsync(Campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, CatchAsync(Campgrounds.editCampground))

module.exports = router;