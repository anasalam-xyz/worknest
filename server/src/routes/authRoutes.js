const express = require('express');
const router = express.Router();
const { signup, login } = require('authController');

//Register a new user
router.post('/signup', signup);

//login an existing user
router.post('/login', login);

module.exports = router;