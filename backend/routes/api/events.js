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

router.patch('/:id/edit', requireUser, async (req, res, next) => {
    let event;
    let eventData = {...event,
                    lat: req.body.lat,
                    lng: req.body.lng,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    description: req.body.description,
                    title: req.body.title}
    try {
        event = await Event.findById(req.params.id)
                                // .populate('title')
    }
    catch(err) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = { message: "No event found with that id" };
        return next(error);
    }
    if (req.user._id != event.author._id) {
        throw new Error("Current user is not event's author")
    } else {
        updatedEvent = await Event.updateOne({...event}, {...eventData})
        return res.json(updatedEvent)
    }
})

router.delete('/:id', requireUser, async (req, res, next) => {
    let event;
    
    try {
        event = await Event.findById(req.params.id)
                                        // .populate('title');
    }
    catch(err) {
        const error = new Error('Event not found');
        error.statusCode = 404;
        error.errors = { message: "No event found with that id" };
        return next(error);    
    }

    if (req.user._id != event.author._id) {
        throw new Error('Current user is not the event author')
    } else {
        await Event.deleteOne({_id: req.params.id})   
    }
})


// show, create, index(in trip populate), update, delete

module.exports = router