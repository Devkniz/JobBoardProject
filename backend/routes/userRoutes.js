const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const verifyAdminJWT = require('../middleware/verifyAdminJWT')
const verifyLoggedJWT = require('../middleware/verifyLoggedJWT')

router.post('/signup', userController.signup);
// router.post('/signin', userController.signin);

router.use(verifyLoggedJWT)
router.put('/update/:id', userController.update);

router.use(verifyAdminJWT)
router.get('/', userController.findAll);
router.get('/:id', userController.findSingle);
router.delete('/remove/:id', userController.remove);
module.exports = router;