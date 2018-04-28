var express = require('express');
var router = express.Router();
var TwitterHelper = require('../functions/twitter-helper');

router.post('/', function(req, res, next) {
    var twitInstance = req.app.get('twit-instance');
    TwitterHelper.PostTwitterStatus(req.body.message, twitInstance);
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(JSON.stringify({ Success: true }));
});

module.exports = router;
