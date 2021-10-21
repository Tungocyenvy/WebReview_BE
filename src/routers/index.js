const express = require('express');
const router = express.Router();

const account = require('./accountRouter');

router.use('/', account);

module.exports = router;
