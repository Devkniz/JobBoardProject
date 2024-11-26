const express = require('express');
const router = express.Router();
const path = require('path')
const advertisementController = require('../controllers/AdvertisementController');
const verifyAdminJWT = require('../middleware/verifyAdminJWT')

router.get('/', advertisementController.findAll);
router.get('/:id', advertisementController.findSingle);
router.get('/pagination/:page', advertisementController.getPagination);
router.get('/search/:keyword', advertisementController.search);
router.post('/increment/:id', advertisementController.incrementApplications);
router.post('/decrement/:id', advertisementController.decrementApplications);

router.use(verifyAdminJWT)
router.post('/', advertisementController.create);
router.delete('/remove/:id', advertisementController.remove);
router.put('/update/:id', advertisementController.update);

module.exports = router;