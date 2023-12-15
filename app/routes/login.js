const express = require('express');
const router = express.Router();

const loginCtrl = require('../controller/login.controller.js');
const auth = require('../middleware/auth');
const userCtrl = require('../controller/user.controller.js');
//LOGIN
router.post('/signup', userCtrl.create, loginCtrl.create);

module.exports = router;