var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  audio = "sounds/"+randomChosenColour+".mp3";
  playSound(audio);
}

nextSequence();


$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound("sounds/"+userChosenColour+".mp3");
  console.log(userClickedPattern);
});

function playSound(name) {
  audio = new Audio(name);
  audio.play();
}
