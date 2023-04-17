const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Trip = mongoose.model('Trip');
const { requireUser } = require('../../config/passport');
const validateTripInput = require('../../validation/trip');

router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find()
                                    .populate('author', '_id username')
                                    .sort({ createdAt: -1 });
        return res.json(trips);
    }
    catch(err) {
        return res.json([]);
    }
})

router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    } catch(err) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const trips = await Trip.find({ author: user._id })
                                .sort({ createdAt: -1 })
                                .populate("author", "_id username")
        return res.json(trips);
    }
    catch(err) {
        return res.json([]);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.id)
                                .populate("author", "_id username")
        return res.json(trip);                        
    }
    catch(err) {
        const error = new Error('Trip not found');
        error.statusCode = 404;
        error.errors = { message: "No trip was found with that id" };
        return next(error)
    }
})

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no 
// current user.) Also attach validateTripInput as a middleware before the 
// route handler.
router.post('/', requireUser, validateTripInput, async (req, res, next) => {
    try {
      const newTrip = new Trip({
        text: req.body.text,
        author: req.user._id
      });
  
      let trip = await newTrip.save();
      trip = await trip.populate('author', '_id username');
      return res.json(trip);
    }
    catch(err) {
      next(err);
    }
  });
  
  module.exports = router;