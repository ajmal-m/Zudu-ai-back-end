const express = require('express');
const {Register, LogIn, Logout, Refresh} = require('../controllers/Auth.controller');
const router = express.Router();

router.post('/register', Register);
router.post('/login', LogIn);
router.get('/refresh', Refresh);
router.get('/logout', Logout);


module.exports = router;