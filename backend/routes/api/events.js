const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Trip = mongoose.model('Trip');
const Event = mongoose.model('Event');
const { requireUser } = require('../../config/passport');
const validateEventInput = require('../../validation/events')


router.get('/:id', async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id)
                                    
        return res.json(event)
    }
    catch(err) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = { message: 'No event found with that id' };
        return next(error);
    }
})



// show, create, index(in trip populate), update, delete

module.exports = router