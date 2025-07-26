const express = require('express');
const { updateUserRole, getAllUsers} = require('../controllers/User.controller');
const router = express.Router();
const {adminValidation} = require('../middleware/Auth.middleware');

router.get('/', adminValidation, getAllUsers);
router.put('/:id/role', adminValidation, updateUserRole);


module.exports = router;