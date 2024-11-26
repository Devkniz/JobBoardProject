const express = require('express');
const HTMLEncoderDecoder = require('html-encoder-decoder')
const router = express.Router();
const applicationController = require('../controllers/ApplicationController');
const verifyAdminJWT = require('../middleware/verifyAdminJWT')
const verifyLoggedJWT = require('../middleware/verifyLoggedJWT')
const multer = require('multer');
const upload = multer({ dest: 'uploadedResume/' });

router.post('/', applicationController.apply);

router.use(verifyLoggedJWT)
router.get(HTMLEncoderDecoder.encode('/user/:email'), applicationController.findAllByEmail);
router.use(verifyAdminJWT)
router.get('/', applicationController.findAll);
router.get('/communications', applicationController.findAllCommunications);
router.get('/:id', applicationController.findOne);
router.put('/:id', applicationController.update);
router.delete('/:id', applicationController.remove);
router.post('/create', applicationController.create);
module.exports = router;