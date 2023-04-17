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
                                //.populate('author','_id username')
                                //.sort({ createdAt: -1 });
        return res.json(trips);
    }
    catch(err) {
        return res.json([])
    }
})

module.exports = router