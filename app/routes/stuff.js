const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth.js')
const multer = require('../middleware/multer-config');
const stuffCtrl = require('../controller/tutorial.controller.js');

router.get('/', auth, stuffCtrl.findAll);

router.post('/', auth, multer, stuffCtrl.create);
/*
router.get('/:id', auth, stuffCtrl.findOne);

router.put('/:id', auth, multer, stuffCtrl.modifyThing);

router.delete('/:id', auth, stuffCtrl.deleteThing);
*/
module.exports = router;