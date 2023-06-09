const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./User')

const tripSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    events: [{type: Schema.Types.ObjectId,
                ref: 'Event'}],
    collaborators: [{type: Schema.Types.ObjectId,
                    ref: 'User'}],
    lat: {
        type: Number
        // default: 40.73631643149453
    },
    lng: {
        type: Number
        // default: -73.99376925185645
    },
    address: {
        type: String,
    },
    imageUrls: {
        type: [String],
        required: false
      }
}, {
    timestamps: true
})

module.exports = mongoose.model('Trip', tripSchema)