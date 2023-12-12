const express = require('express');
const router = express.Router();

const enterpriseCtrl = require('../controller/enterprise.controller.js');
const auth = require('../middleware/auth');


//enterprise
router.post('/create', enterpriseCtrl.create);

module.exports = router;