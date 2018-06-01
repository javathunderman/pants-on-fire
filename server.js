var fs = require('fs');
var sources = require("./sources.json");
var express = require('express');
var util = require('util');
var request = require('request');
var app = express();
var path = require('path');
var spawn = require("child_process").spawn;
app.use('/', express.static(path.join(__dirname, 'public')));

var server = app.listen(5000, function() {
  console.log('Server listening on port 5000');
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('newComment', function(comment, callback) {
    commentBody = (comment.text);
	siteName = (comment.sitename);
	console.log(siteName);
    console.log(commentBody);
    request({
      method: 'post',
      url: 'http://text-processing.com/api/sentiment/',
      form: {
        text: commentBody
      },

      json: true,
    }, function(error, response, body) {
      var label = body['label'];
      
    });
	var reliabilityResult = Object(sources[siteName]);
    var biasDetector = spawn('python', ["news-bias-detect/detect_bias.py", commentBody]);
    biasDetector.stdout.on('data', function(data) {
      var outputText = data.toString('utf8');
	  var rating = (reliabilityResult['type']);
      console.log(outputText);
	  io.sockets.emit('broadcast', { description: outputText, rating: rating, label:label})
      //util.log(outputText);
    });
	});
});

app.get('/main', function(req, res) {

  var output = outputText;
  res.render(__dirname + "index.html", {output:outputText});

});
