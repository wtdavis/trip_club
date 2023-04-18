const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Trip = mongoose.model('Trip');
const Event = mongoose.model('Event');
const { requireUser } = require('../../config/passport');
const validateEventInput = require('../../validation/events')


// create, index(in trip populate), update, delete