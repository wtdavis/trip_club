const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const Trip = mongoose.model('Trip');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validation/tweets')
const validateTripInput = require('../../validation/trips')

router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find()
                                .populate('author','_id username')
                                .sort({ createdAt: -1 });
        return res.json(trips);
    }
    catch(err) {
        return res.json([])
    }
});

router.post('/', requireUser, validateTripInput, async (req, res, next) => {
    try {
        const newTrip = new Trip({
            author: req.user._id,
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });
        let trip = newTrip.save()
        // trip = await trip.populate('author', '_id username');
        return res.json(trip)
    }
    catch(err){
        next(err)
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
                                // .populate("author", "_id username", "title", "description", "startDate", "endDate");
                                .populate("author", "_id username");
      return res.json(trips);
    }
    catch(err) {
      return res.json([]);
    }
  })

//   router.get('/:tripId', async (req, res, next) => {
//     let trip;
//     try {
//       trip = await Trip.findById(req.params.tripId);
//     } catch(err) {
//       const error = new Error('User not found');
//       error.statusCode = 404;
//       error.errors = { message: "No trip found with that id" };
//       return next(error);
//     }
//     try {
//       const trips = await Trip.find({ author: user._id })
//                                 .sort({ createdAt: -1 })
//                                 // .populate("author", "_id username", "title", "description", "startDate", "endDate");
//                                 .populate("author", "_id username");
//       return res.json(trips);
//     }
//     catch(err) {
//       return res.json([]);
//     }
//   })

module.exports = router