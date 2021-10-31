const express = require('express');
const router = express.Router();

const account = require('./accountRouter');
const post = require('./postRouter');

router.use('/', account);
router.use('/', post);

module.exports = router;
