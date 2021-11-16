const express = require('express');
//const router = express.Router();

const account = require('./accountRouter');
const post = require('./postRouter');
const comment = require('./commentRouter');
const category = require('./categoryRouter');
const uploadImage = require('./uploadImageRouter');
const group = require('./groupRouter');

function router(app) {
  app.use('/account', account);
  app.use('/post', post);
  app.use('/comment', comment);
  app.use('/category', category);
  app.use('/image', uploadImage);
  app.use('/group', group);
}

module.exports = router;
