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

function animatePress(currentColour) {
  var clickedButton =   $("#"+currentColour);
  clickedButton.addClass("pressed");
    setTimeout(function() {
      clickedButton.removeClass("pressed");
    }, 100);
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

$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound("sounds/"+userChosenColour+".mp3");
  animatePress(userChosenColour);
  console.log(userClickedPattern);
});

function playSound(name) {
  audio = new Audio(name);
  audio.play();
}
