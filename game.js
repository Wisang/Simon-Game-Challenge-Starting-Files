var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickSequence = [];
var started = true;
var level = 0;
var clickCount = 0;

$(document).on("keydown", function() {
  if(started) {
    nextSequence();
  }
  started = false;
});

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickSequence.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if(checkAnswer(userClickSequence.length-1)){
    if(userClickSequence.length === level) {
      clickCount = 0;
      setTimeout(nextSequence, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
});

function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}

function checkAnswer(cursor) {
  if(gamePattern[cursor] === userClickSequence[cursor]) {
    return true;
  }
  return false;
}

function animatePress(currentColour) {
  var clickedButton = $("#" + currentColour);
  clickedButton.addClass("pressed");
  setTimeout(function() {
    clickedButton.removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickSequence = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animate(randomChosenColour);
  playSound(randomChosenColour);

  $("h1").text("Level " + level);
  level++;
}

function animate(color) {
  $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(color) {
  name = "sounds/" + color + ".mp3";
  audio = new Audio(name);
  audio.play();
}
