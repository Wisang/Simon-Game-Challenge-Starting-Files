var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = true;
var level = 0;
var clickCount = 0;

$(document).on("keydown", function() {
  if (started) {
    nextSequence();
    console.log("started");
  }
  started = false;
});

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  // userClickedPattern.push(userChosenColour);
  playSound("sounds/" + userChosenColour + ".mp3");
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
    console.log("correct");
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
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  audio = "sounds/" + randomChosenColour + ".mp3";
  playSound(audio);

  $("h1").text("Level " + level);
  level++;
  console.log("game: " + gamePattern);
}

function playSound(name) {
  audio = new Audio(name);
  audio.play();
}
