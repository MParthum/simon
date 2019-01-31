var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Random colors

function randomChosenColor() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomNumber]);
  $("#" + buttonColors[randomNumber]).fadeOut(100).fadeIn(100);
  playSound(buttonColors[randomNumber]);
}

// Click actions

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  $("#" + userChosenColor).toggleClass("pressed");
  setTimeout(function() {
    $("#" + userChosenColor).toggleClass("pressed");
  }, 100);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Plays sounds

function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}


// Start game

$("body").keypress(function() {
  if (level === 0) {
    $("h1").text("Level " + level);
    randomChosenColor();
  }
});


// Check answers

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(randomChosenColor, 1000);
      userClickedPattern = [];
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").toggleClass("game-over");
    setTimeout(function() {
      $("body").toggleClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


// Starting Over

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
