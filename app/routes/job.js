const express = require('express');
const router = express.Router();

const jobCtrl = require('../controller/job.controller.js');

//JOB
router.post('/create', jobCtrl.create);

module.exports = router;