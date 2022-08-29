var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).on("keydown", function() {
  started = !started;
  console.log(started);
  if(started) {
    nextSequence();
  }
});

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound("sounds/"+userChosenColour+".mp3");
  animatePress(userChosenColour);
  if(checkAnswer(level)) {
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  for(var i=0; i<gamePattern.length; i++) {
    if(gamePattern[i] !== userClickedPattern[i]) {
      console.log("wrong!");
      return false;
    }
  }
  console.log("correct!");
  return true;
}

function animatePress(currentColour) {
  var clickedButton =   $("#"+currentColour);
  clickedButton.addClass("pressed");
    setTimeout(function() {
      clickedButton.removeClass("pressed");
    }, 1000);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  audio = "sounds/"+randomChosenColour+".mp3";
  playSound(audio);

  $("h1").text("Level " + level);
  level++;
}

function playSound(name) {
  audio = new Audio(name);
  audio.play();
}
