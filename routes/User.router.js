const express = require('express');
const { updateUserRole, getAllUsers} = require('../controllers/User.controller');
const router = express.Router();

router.get('/', getAllUsers);
router.put('/:id/role', updateUserRole);


module.exports = router;