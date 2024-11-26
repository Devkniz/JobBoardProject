const express = require('express');
const router = express.Router();
const companieController = require('../controllers/CompanieController');
const verifyAdminJWT = require('../middleware/verifyAdminJWT')

router.get('/', companieController.findAll);
router.get('/:id', companieController.findSingle);

router.use(verifyAdminJWT)
router.post('/', companieController.create);
router.delete('/remove/:id', companieController.remove);
router.put('/update/:id', companieController.update);
module.exports = router;