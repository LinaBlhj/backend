const express = require('express');
const router = express.Router();

const loginCtrl = require('../controller/login.controller.js');
const auth = require('../middleware/auth');

//LOGIN
router.post('/create', loginCtrl.create);

module.exports = router;