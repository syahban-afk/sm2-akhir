const { registerUser } = require('../models/authModel')
const { body, validationResult } = require('express-validator');

async function register(req, res) {
    const validations = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').notEmpty().isEmail().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
        body('Phone').notEmpty().withMessage('Phone is required')
    ]
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errMsg = errors.array().map(error => ({
            [error.path]: error.msg
        }))
        return res.status(422).json({
            status: false,
            message: 'Invalid data',
            error: errMsg
        })
    }

    const { name, email, password, phone } = req.body;
    try {
        const result = await registerUser(name, email, password, phone);
        if (result.success) {
            res.status(201).json({
                success: result.success,
                message: result.message,
            });
        } else {
            res.status(500).json({ error: result.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register
}