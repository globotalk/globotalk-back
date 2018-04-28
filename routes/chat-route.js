var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var fbAdmin = req.app.get('firebase-admin');

  res.setHeader('Content-Type', 'application/json');

  if(req.body.share_on_twitter == true){
    var twitInstance = req.app.get('twit-instance');
    TwitterHelper.PostTwitterStatus(req.body.message, twitInstance);
  }

  fbAdmin.messaging().send(req.body.message)
  .then((response) => {
    res.statusCode = 200;
    res.send(JSON.stringify({ Success: True }));
  })
  .catch((error) => {
    res.statusCode = 500;
    res.send(JSON.stringify({ Success: False }));
  });
});

module.exports = router;
