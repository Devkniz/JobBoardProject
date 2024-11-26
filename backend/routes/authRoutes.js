const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController.js')
const verifyLoggedJWT = require('../middleware/verifyLoggedJWT')

router.post('/', authController.login)
router.post('/logout', authController.logout)

router.use(verifyLoggedJWT)
router.post('/me', authController.me);
router.post('/updateprofil', authController.updateProfil);
module.exports = router