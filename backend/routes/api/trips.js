const { multipleFilesUpload, multipleMulterUpload } = require("../../awsS3");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Trip = mongoose.model('Trip');
const Event = mongoose.model('Event')
const { requireUser } = require('../../config/passport');
const validateTripInput = require('../../validation/trips')
const validateEventInput = require('../../validation/events')

// Trip Index, works
router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find()
                                .populate('author','_id username email')
                                .populate('collaborators', '_id username email')
                                .populate('events', '_id title description trip startTime endTime lat lng address collaborators')
                                .sort({ createdAt: -1 });
        return res.json(trips);
    }
    catch(err) {
        return res.json([])
    }
});

// Trip Show, works 
router.get('/:id', async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.id)
                                        .populate('author', '_id username email')
                                        .populate('collaborators', '_id username email')
                                        .populate('events', '_id title description startTime endTime trip lat lng address collaborators')

                                        // this populate doesn't work --> .populate('events', 'author trip lat lng startTime endTime descriptioin title')

        return res.json(trip)
    }
    catch(err) {
        const error = new Error('Trip not found');
        error.statusCode = 404;
        error.errors = { message: "No trip found with that id" };
        return next(error);    
    }
})

// Trip Create, works
router.post('/', multipleMulterUpload("images"), requireUser, validateTripInput, async (req, res, next) => {
    const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
    try {
        const newTrip = new Trip({
            author: req.user,
            title: req.body.title,
            description: req.body.description,
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            lat: req.body.lat,
            lng: req.body.lng,
            address: req.body.address,
            imageUrls,
            // events: JSON.parse(req.body.events),
            collaborators: JSON.parse(req.body.collaborators)
        });
        let trip = await newTrip.save()
        
        trip = await trip.populate("author", "_id username profileImageUrl");
        return res.json(trip)
    }
    catch(err){
        next(err)
    }
})

//Author Show, works
router.get('/author/:userId', async (req, res, next) => {

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
                                .populate("author", "_id username email")
                                .populate('collaborators', '_id username email')
                                .populate('events', '_id startTime endTime trip title description lat lng address collaborators');
      return res.json(trips);
    }
    catch(err) {
      return res.json([]);
    }
  })


// Collaborator Show, works
router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    } catch(err) {
        const error = new Error('User not found');
        error.statusCode = 404;
        error.errors = { message: 'No user found with that id' };
        return next(error);
    }
    try {
        
        const trips = await Trip.find({collaborators: user._id})
                                // .concat(await Trip.find({author: user._id}))
                                .sort({ startDate: -1 })
                                .populate('events', '_id title description startTime endTime trip lat lng address collaborators')
                                .populate('collaborators', '_id username email');

        const myTrips = await Trip.find({author: user._id})
                                // .sort({startDate: -1})
                                .populate('events', '_id title description startTime endTime trip lat lng address collaborators')
                                .populate('collaborators', '_id username email');
        const data = trips.concat(myTrips)
        return res.json(data);
    }
    catch(err) {
        return res.json([]);
    }
})

// Trip Patch works
router.patch('/:id', multipleMulterUpload("images"), requireUser, async (req, res, next) => {
    const imageUrls = await multipleFilesUpload({files: req.files, public: true})
    let trip;
    
    let tripData = { 
                    title: req.body.title, 
                    description: req.body.description,
                    startDate: new Date(req.body.startDate),
                    endDate: new Date(req.body.endDate),
                    lat: req.body.lat,
                    lng: req.body.lng,
                    address: req.body.address,
                    events: JSON.parse(req.body.events),
                    imageUrls,
                    collaborators: JSON.parse(req.body.collaborators)
                }

    try {
        trip = await Trip.findById(req.params.id)
                                        .populate('title');
                                       
    }
    catch(err) {
        const error = new Error('Trip not found');
        error.statusCode = 404;
        error.errors = { message: "No trip found with that id" };
        return next(error);    
    }

    // return res.json(trip.author._id);
    if (!req.user._id === trip.author._id) {
        throw new Error('Current user is not the trip author')
    } else {
            const updatedTrip = await Trip.findOneAndUpdate({_id: trip._id},
                {...tripData, imageUrls: trip.imageUrls.concat(imageUrls),
                collaborators: JSON.parse(req.body.collaborators), events: JSON.parse(req.body.events)},
                {new: true})
                .populate('collaborators', '_id username email')
                .populate('events', '_id title description startTime endTime trip lat lng address collaborators')
                   
            return res.json(updatedTrip)
            // updatedTrip = await Trip.updateOne({_id: trip._id}, {...tripData, events: req.body.events, collaborators: req.body.collaborators, imageUrls: imageUrls})
            // await updatedTrip.save()
            // return res.json(updatedTrip)       
    }
})  

// Trip Delete, works
router.delete('/:id', requireUser, async (req, res, next) => {
    // debugger
    let trip;
    
    try {
        trip = await Trip.findById(req.params.id)
                                        // .populate('title');
    }
    catch(err) {
        const error = new Error('Trip not found');
        error.statusCode = 404;
        error.errors = { message: "No trip found with that id" };
        return next(error);    
    }
    // debugger
    if (!req.user._id === trip?.author._id) {
        throw new Error('Current user is not the trip author')
    } else {
        await Trip.deleteOne({_id: req.params.id})   
        return res.json('Trip deleted')
    }
})


// New event for a trip, works but fails the commented out validations
router.post('/:tripId/events', requireUser, validateEventInput, async (req, res, next) => {
    // console.log(req.body)
    // console.log(req.params.tripId)
    try {
        const newEvent = new Event({
            author: req.user,
            trip: req.params.tripId,
            title: req.body.title,
            lat: req.body.lat,
            lng: req.body.lng,
            address: req.body.address,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            collaborators: JSON.stringify(req.body.collaborators),
            description: req.body.description
        })
        let event = await newEvent.save()
        event = await event.populate('author', '_id username')

        
        return res.json(event)
    }
    catch(err) {
        next(err)
    }
})

// All events for a trip. Not really needed, works
router.get('/:tripId/events', async (req, res) => {
    try {
        let events;
        events = await Event.find({trip: req.params.tripId})
                            // .populate    
        return res.json(events)
    }
    catch(err) {    
        return res.json([])
    }
})

// 
module.exports = router