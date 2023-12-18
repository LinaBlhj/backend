const express = require('express');
const router = express.Router();

const userCtrl = require('../controller/user.controller.js');
const auth = require('../middleware/auth');

router.post('/login', userCtrl.login);

//USER
router.get('/get/:id', /*auth,*/ userCtrl.findOne);
router.put('/editUser', /*auth, multer,*/ userCtrl.update)
router.post('/signup', userCtrl.create);
router.post('/requestResetPassword', userCtrl.requestPasswordReset);
router.post("/resetPassword", userCtrl.resetPassword);
router.post('/verifyCode', userCtrl.verifyCode)
//associate job
router.post('/associate', userCtrl.associate);
router.get('/conv/:id/:recipient',/* auth, */userCtrl.getConversation)
module.exports = router;