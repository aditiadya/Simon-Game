var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level=0;
var started = false;
var userClickedPattern = [];

$(document).keypress(function() 
{
    if (!started) {
      nextSequence();
      started = true;
    }
});

$(".btn").on("click", function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }

    } 
    else 
    {
      $("body").addClass("game-over")
      $("h1").text("Wrong");
      var audio2 = new Audio("sounds/wrong.mp3");
        audio2.play();
      setTimeout(function() 
      {
        $("body").removeClass("game-over");
        
      }, 1000);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
    
}

function nextSequence()
{
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
      
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function startOver()
{
    level=0;
    gamePattern =[];
    started = false;
}