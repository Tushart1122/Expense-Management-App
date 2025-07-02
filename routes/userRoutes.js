const express = require('express');
const registerController = require('../controllers/RegisterControllers');
const loginController = require('../controllers/LoginControllers');


const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);

module.exports = router;
