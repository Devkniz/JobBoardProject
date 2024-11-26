const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.post('/', adminController.createAdmin);

module.exports = router;