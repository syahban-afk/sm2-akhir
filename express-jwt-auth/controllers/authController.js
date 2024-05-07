const {registerUser}= require('../models/authModel')
const { body, validationResult } = require('express-validator');

async function register (req, res) {
    const validation = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
        body('Phone').notEmpty().withMessage('Phone is required')
    ]
}

module.exports={
    register
}