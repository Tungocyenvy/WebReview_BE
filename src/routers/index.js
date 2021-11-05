const express = require('express');
const router = express.Router();

const account = require('./accountRouter');
const post = require('./postRouter');
const comment = require('./commentRouter');
const category = require('./categoryRouter');

router.use('/', account);
router.use('/', post);
router.use('/', comment);
router.use('/', category);

module.exports = router;
