const express = require('express');
const { register, login, me } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validateAuth');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', requireAuth, me);

module.exports = router;
