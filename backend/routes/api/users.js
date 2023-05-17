const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { loginUser, restoreUser } = require('../../config/passport');
const DEFAULT_PROFILE_IMAGE_URL = "https://trip-club-dev.s3.amazonaws.com/public/profile_image_default.jpg";

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const { isProduction } = require('../../config/keys');

// Attach restoreUser as a middleware before the route handler to gain access
// to req.user. (restoreUser will NOT return an error response if there is no
// current user.)
router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl,
    email: req.user.email
  });
})


// users Index
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
                            .sort({username: -1})
    return res.json(users);
  }
  catch(err) {
    return res.json([])
  }
})

// users Show
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    return res.json(user)
  }
  catch(err) {
    const error = new Error('User not found')
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
})

// Attach validateRegisterInput as a middleware before the route handler
router.post('/register', singleMulterUpload("image"), validateRegisterInput, async (req, res, next) => {
  // Check to make sure nobody has already registered with a duplicate email or
  // username
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });    
  
  if (user) {
    // Throw a 400 error if the email address or username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const profileImageUrl = req.file ?
      await singleFileUpload({ file: req.file, public: true }) :
      DEFAULT_PROFILE_IMAGE_URL;
  const newUser = new User({
    username: req.body.username,
    profileImageUrl,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        // Generate the JWT
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

// Attach validateLoginInput as a middleware before the route handler
router.post('/login', singleMulterUpload(""), validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    // Generate the JWT
    return res.json(await loginUser(user));
  })(req, res, next);
});

module.exports = router;