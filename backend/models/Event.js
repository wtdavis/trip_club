const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    trip: {
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    startTime: {
        type: Date,
        required: true
    }, 
    endTime: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    attendees: [Schema.Types.ObjectId]
}, {timestamps: true}
)
module.exports = mongoose.model('Event', eventSchema)