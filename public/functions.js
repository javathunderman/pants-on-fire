
(function calculateTruthiness() {
  var article = document.getElementById("article")
  var percentage = 98;
  //(typeof percentage !== 'undefined') ? MLFUNCTION : 0;
  document.getElementById("tPercentage").innerHTML = percentage;
  document.getElementById("fPercentage").innerHTML = 100 - percentage;
})();

function move() {
  var truthiness = document.getElementById("truthiness").innerHTML;
  var tWidth = 0;
  var tId = setInterval(frame, 10);
  function frameT() {
    if (tWidth >= 100) {
      clearInterval(tId);
    } else {
    tWidth++;
      truthiness.style.width = tWidth + '%';
      truthiness.innerHTML = tWidth * 1  + '%';
    }
  }

  var fakeness = document.getElementById("fakeness").innerHTML;
  var fWidth = 10;
  var fId = setInterval(frame, 10);
  function frameF() {
    if (fWidth >= 100) {
      clearInterval(fId);
    } else {
    fWidth++;
      fakeness.style.width = fWidth + '%';
      fakeness.innerHTML = fWidth * 1  + '%';
    }
  }
}

(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12';
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.twttr = (function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0],
t = window.twttr || {};
if (d.getElementById(id)) return t;
js = d.createElement(s);
js.id = id;
js.src = "https://platform.twitter.com/widgets.js";
fjs.parentNode.insertBefore(js, fjs);
t._e = [];
t.ready = function(f) {
t._e.push(f);
};
return t;
}(document, "script", "twitter-wjs"));


  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  document.getElementById("truth").onClick = function(){
    calculateTruthiness(article);
      $('.shrinker').removeClass('timelapse');
    setTimeout(function() {
      $('.shrinker').addClass('timelapse');
    }, 500)
  }
  function move() {$("#truth").click(function() {
    $('.shrinker').removeClass('timelapse');
    setTimeout(function() {
      $('.shrinker').addClass('timelapse');
    }, 500)
  });
  };

  function move() {$("#truth").click(function() {
    $('.shrinker').removeClass('timelapse');
    setTimeout(function() {
      $('.shrinker').addClass('timelapse');
    }, 500)
  });
  };
