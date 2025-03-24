const express = require('express');
const { login, signup,
    logout, refresh } = require('../conrollers/user.controller');
const router = express.Router();

router.post('/', login);
router.post('/logout',logout)
router.post('/', signup);
router.post('/refresh', refresh);

module.exports = router;