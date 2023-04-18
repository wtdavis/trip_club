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
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    events: [Schema.Types.ObjectId],
    collaborators: [Schema.Types.ObjectId],
    //images: {
        //type: Schema.Types.
    // }
}, {
    timestamps: true
})

module.exports = mongoose.model('Trip', tripSchema)