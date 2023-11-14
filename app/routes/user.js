const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/user.controller.js');

router.post('/login', userCtrl.login);

//USER
router.post('/signup', userCtrl.create);

module.exports = router;