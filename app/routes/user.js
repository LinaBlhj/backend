const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/user.controller.js');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.test);
router.post('/', userCtrl.testPost);
module.exports = router;