var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET landing page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Github Total Commit' });
});

/**
  * GET API value.
  * /github/dusk196/github-total-commit?style=for-the-badge&color=green
 **/
router.get('/github/:user/:repo', function (req, res, next) {

  var fetchInfo = 'https://api.github.com/repos/' + req.params.user + '/' + req.params.repo + '/contributors';
  var info;

  axios.get(fetchInfo)
    .then(function (response) {
      info = response.data[0].contributions;
    })
    .catch(function (error) {
      console.error(error);
      info = 'unable_to_fetch_details';
    })
    .then(function () {
      var fetchSvg = 'https://img.shields.io/badge/total_commits-' + info + '-' + req.query.color + '?style=' + req.query.style + '&logo=github';
      var finalResponse;
      axios.get(fetchSvg)
        .then(function (response) {
          finalResponse = response.data;
        })
        .catch(function (error) {
          console.error(error);
          finalResponse = 'unable to fetch details';
        })
        .then(function () {
          return res.status(200).send(finalResponse);
        });
    });

});

module.exports = router;
