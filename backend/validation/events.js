const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors')

const validateEventInput = [
    // check('author')
    // .exists({checkFalsy: true})
    // .withMessage('Event must have an author'),

    // check('trip')
    // .exists({ checkFalsy: true})
    // .withMessage('Event must have a trip it belongs to'),

    // check('lat')
    // .isFloat({min: -90, max: 90})
    // .withMessage('Latitude must be a number between -90 and 90'),

    // check('lng')
    // .isFloat({min: -180, max: 180})
    // .withMessage('Longitude must be a number between -180 and 180'),

    // check('address')
    // .exists({checkFalsy: true})
    // .withMessage('Trip must have an location'),

    // check('startTime')
    // .exists({ checkFalsy: true })
    // .withMessage('Event must have a start time'),

    // check('endTime')
    // .exists({ checkFalsy: true })
    // .withMessage('Event must have an end time'),

    // check('description')
    // .exists({ checkFalsy: true })
    // .withMessage('Event must have a title'),



    handleValidationErrors
]

module.exports = validateEventInput

// {
//     "username": "demo",
//     "email": "demo@user.io",
//     "password": "password"
// }
// {
//     "title": "testEvent2",
//     "description": "testEvent2Desc",
//     "startTime": "2027-07-19T18:08:13.150+00:00",
//     "endTime": "2028-07-19T18:08:13.150+00:00",
//     "lat": "34.0493242342",
//     "lng": "-110.234234234",
//     "attendees": ["64402e0be39c2ef9bc7fc99c", "64402e0be39c2ef9bc7fc99d"]
// }
// http://localhost:5000/api/trips/64403704cad4111b61a0d9a9/events