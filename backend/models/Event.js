const mongoose = require('mongoose');
const userSchema = require('./User')
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
        // default: 40.73631643149453
    },
    lng: {
        type: Number
        // default: -73.99376925185645
    },
    address: {
        type: String,
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
    collaborators: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true}
)
module.exports = mongoose.model('Event', eventSchema)