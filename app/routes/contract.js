const express = require('express');
const router = express.Router();

const contractCtrl = require('../controller/contract.controller.js');

//generate pdf
router.post('/create', contractCtrl.create);

module.exports = router;