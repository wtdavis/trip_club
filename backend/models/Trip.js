const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    author_id: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: { 
        type: String
    },
    // events: {
    //     type: Array,
    //     ref: 'Event'
    // },

    // collaborators: {
        // type: Array,
        // ref: 'User'
        // }
    cost: {
        type: Number
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    // images: {
    //     type: Array,
    // }
}, {
    //tells mongoose to add and maintain 'createdAt' and 'updatedAt'
    //datetime timestamps
    timestamps: true
});

module.exports = mongoose.model('Trip', tripSchema)