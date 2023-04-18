const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors')

const validateTripInput = [
    check('author')
    .exists({ checkFalsy: true})
    .withMessage('Trip must have an author'),

    check('title')
    .exists({ checkFalsy: true })
    .isLength( { min: 4, max: 40})
    .withMessage('Title must be between 4 and 40 characters'),

    check('description')
    .isLength( { min: 0, max: 140})
    .withMessage('Description must be at most 140 characters'),

    check('startDate')
    .exists({checkFalsy: true})
    .withMessage('Trip must have a Start Date'),

    check('endDate')
    .exists({checkFalsy: true})
    .withMessage('Trip must have an End Date'),

    handleValidationErrors
]

module.exports = validateTripInput