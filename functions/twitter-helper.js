var twitterHelper = {

    PostTwitterStatus: function(inputData, twitInstance) {
        twitInstance.post('statuses/update', { status: inputData }, function(err, data, response) {}, function(err) {console.log(err);});
    }

}
module.exports = twitterHelper;
