const express = require('express');
const router = express.Router();
const path = require('path');
const connexionController = require('../controllers/connexionController.js');

router.get('/', connexionController.findAll);

module.exports = router;