var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
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
  // userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  clickCount++;
  if(checkAnswer(clickCount, userChosenColour)){
    if(clickCount === level) {
      clickCount = 0;
      nextSequence();
    }
  }
  else {
    alert("wrong input. Game over!")
  }
});

function checkAnswer(level, color) {
  if(gamePattern[clickCount-1] === color) {
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
