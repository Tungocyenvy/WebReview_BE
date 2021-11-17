const express = require('express');
//const router = express.Router();

const account = require('./accountRouter');
const post = require('./postRouter');
const comment = require('./commentRouter');
const category = require('./categoryRouter');
const image = require('./imageRouter');
const admin = require('./adminRouter');
const group = require('./groupRouter');

function router(app) {
  app.use('/account', account);
  app.use('/post', post);
  app.use('/comment', comment);
  app.use('/category', category);
  app.use('/image', image);
  app.use('/group', group);
  app.use('/admin', admin);
}

module.exports = router;
