const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/user.controller.js');

router.post('/login', userCtrl.login);
//USER
router.post('/signup', userCtrl.create);
router.post('/requestResetPassword', userCtrl.requestPasswordReset);
router.post("/resetPassword", userCtrl.resetPassword);
module.exports = router;