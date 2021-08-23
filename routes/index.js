var express = require('express');
var router = express.Router();
var githubRouter = require('./github');

/**
  * GET landing page.
 **/
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Github Total Commit' });
});

router.use(githubRouter);

module.exports = router;
