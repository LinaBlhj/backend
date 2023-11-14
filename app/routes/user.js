const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/user.controller.js');

router.post('/login', userCtrl.login);

//USER
router.post('/signup', userCtrl.create);

//associate job
router.post('/associate', userCtrl.associate);

module.exports = router;