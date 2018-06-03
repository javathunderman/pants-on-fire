var fs = require('fs');
var sources = require("./sources.json");
var express = require('express');
var util = require('util');
var request = require('request');
var app = express();
var path = require('path');
//var label = "";
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
	var label = "";
	console.log(siteName);
    console.log(commentBody);
    
	var reliabilityResult = Object(sources[siteName]);
    var biasDetector = spawn('python', ["news-bias-detect/detect_bias.py", commentBody]);
    biasDetector.stdout.on('data', function(data) {
      var outputText = data.toString('utf8');
	  //console.log(furtherInfo);
	  if (reliabilityResult['type'] != undefined) {
	  var rating = ("Rating: " + reliabilityResult['type']);
	  }
	  else if (reliabilityResult['type'] == undefined) {
	  var rating = ("Source could not be found in unreliable sites database. ");
	  }
	  if(outputText == undefined) {
		 outputText = ("No text provided");
	  }
      console.log(outputText);
	  sentAnalysis(commentBody, outputText, rating);
	  
      //util.log(outputText);
    });
	});
function sentAnalysis(commentBody, outputText, rating) {
request({
      method: 'post',
      url: 'http://text-processing.com/api/sentiment/',
      form: {
        text: commentBody
      },

      json: true,
    }, function(error, response, body) {
      var label = ("Sentiment analysis: " + body['label']);
      console.log(label);
	  if (label == undefined) {
		label = ("Sentiment analysis error");
	  }
	  io.sockets.emit('broadcast', { description: outputText, rating: rating, label:label})
    });
}
});

app.get('/main', function(req, res) {

  var output = outputText;
  res.render(__dirname + "index.html", {output:outputText});

});
