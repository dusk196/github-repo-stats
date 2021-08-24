var express = require('express');
var axios = require('axios');
var router = express.Router();

/**
  * GET total Github Contributions
  * /github/contrib/{dusk196}/{github-total-commit}?style={for-the-badge}&color={green}
 **/
router.get('/github/contrib/:user/:repo', function (req, res, next) {

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
      var fetchSvg = 'https://img.shields.io/badge/contributions-' + info + '-' + req.query.color + '?style=' + req.query.style + '&logo=github';
      var finalResponse;
      axios.get(fetchSvg)
        .then(function (response) {
          finalResponse = response.data;
        })
        .catch(function (error) {
          console.error(error);
        })
        .then(function () {
          return res.header('Content-Type', 'image/svg+xml;charset=utf-8').send(finalResponse);
        });
    });

});

/**
  * GET total Github Commits
  * /github/commit/{dusk196}/{github-total-commit}?style={for-the-badge}&color={green}
 **/
router.get('/github/commit/:user/:repo', function (req, res, next) {

  var fetchInfo = 'https://api.github.com/repos/' + req.params.user + '/' + req.params.repo + '/stats/commit_activity';
  var info;

  axios.get(fetchInfo)
    .then(function (response) {
      info = 0;
      response.data.map(function (x) { info = info + x.total; });
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
        })
        .then(function () {
          return res.header('Content-Type', 'image/svg+xml;charset=utf-8').send(finalResponse);
        });
    });

});

module.exports = router;
