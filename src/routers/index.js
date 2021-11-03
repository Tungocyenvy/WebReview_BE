const express = require('express');
const router = express.Router();

const account = require('./accountRouter');
const post = require('./postRouter');
const comment = require('./commentRouter');

router.use('/', account);
router.use('/', post);
router.use('/', comment);

module.exports = router;
