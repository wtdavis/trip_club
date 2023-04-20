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
    events: [Schema.Types.ObjectId],
    collaborators: [Schema.Types.ObjectId],
    lat: {
        type: Number,
    },
    lng: {
        type: Number
    }
    //images: {
        //type: Schema.Types.
    // }
}, {
    timestamps: true
})

module.exports = mongoose.model('Trip', tripSchema)