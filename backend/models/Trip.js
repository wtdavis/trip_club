const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    author: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    // events: {
    //     type: Array,
    //     ref: 'Event'
    // },
    cost: {
        type: Integer
    }
}, {
    //tells mongoose to add and maintain 'createdAt' and 'updatedAt'
    //datetime timestamps
    timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema)