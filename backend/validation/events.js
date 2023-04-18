const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors')

const validateEventInput = [
    check('author')
    .exists({ checkFalsy: true})
    .withMessage('Event must have an author'),

    check('trip')
    .exists({ checkFalsy: true})
    .withMessage('Event must have a trip it belongs to'),

    check('lat')
    .isFloat({min: -90, max: 90})
    .withMessage('Latitude must be a number between -90 and 90'),

    check('lng')
    .isFloat({min: -180, max: 180})
    .withMessage('Longitude must be a number between -180 and 180'),

    check('startTime')
    .exists({ checkFalsy: true })
    .withMessage('Event must have a start time'),

    check('endTime')
    .exists({ checkFalsy: true })
    .withMessage('Event must have an end time'),

    check('title')
    .exists({ checkFalsy: true })
    .withMessage('Event must have a title'),

    handleValidationErrors
]

module.exports = validateEventInput