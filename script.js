// Global Constants
const cluePauseTime = 333;  // how long to pause in between clues
const nextClueWaitTime = 1000;  // how long to wait before starting playback of the clue sequence

// Global Variables
var pattern = [];  // Array for the pattern of clues
var progress = 0;  // Player's progress through a given attempt
var gamePlaying = false;  // Is the game being played
var tonePlaying = false;  // Is a tone being played
var volume = 0.5;  // must be between 0.0 and 1.0
var guessCounter = 0;  // Number of guesses by the player within the given turn
var clueHoldTime = 1000;  // how long to hold each clue's light/sound
var mode = 0;  // Mode identifier, 0 = easy, 1 = hard
var mistakes = 0;  // Number of mistakes during a player's attempt, for easy mode
var time;  // Amount of time per turn, based on mode
var intervalID;  // Store setInterval return value, used for clearInterval
var delay;  // The time delay of playing the clue

/**
  * Populate the pattern array with random values between 1 and 8 inclusive
  */
function setPattern() {
  for(let i = 0; i < 8; i++) {
    pattern[i] = Math.floor(Math.random() * 8) + 1;
  }
}

/**
  * Initialize/Reset appropriate variables and start the first clue sequence
  */
function startGame() {
  //initialize game variables
  progress = 0;
  mistakes = 0;
  gamePlaying = true;
  // Swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.querySelector("#message").textContent = "Repeat the pattern back to win the game!";  // Reset the text to normal after win/loss text
  resetTimer();  // Reset the timer to avoid bugs related to starting and stopping too quickly
  setPattern();  // Set the random pattern
  playClueSequence();  // Start the first clue sequence
}

/**
  * Stop the game and return necessary variables to the starting state
  */
function stopGame() {
  resetTimer();  // Reset the timer to the start
  setTimeout(resetTimer, delay);  // Reset timer again after the delay to avoid bugs related to starting and stopping too quickly
  gamePlaying = false;
  clueHoldTime = 1000;  // Reset clueHoldTime to standard in case the game is in Hard Mode
  // Swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

/**
  * Play the tone accompanying the specified button for a specified amount of time
  * @param {number} btn The number of the button that is activated
  * @param {number} len The length of time to play the tone
  */
function playTone(btn, len){ 
  document.getElementById("audio"+btn).currentTime = 0;  // Start tone from the beginning
  document.getElementById("audio"+btn).play();
  // Stop the tone after the desired time len
  setTimeout(function(){
    stopTone(btn)
  }, len)
}

/**
  * Play the tone accompanying the specified button
  * @param {number} btn The number of the button that is activated
  */
function startTone(btn){ 
  document.getElementById("audio"+btn).currentTime = 0;  // Start tone from the beginning
  document.getElementById("audio"+btn).play();
}

/**
  * Stop the tone accompanying the specified button
  * @param {number} btn The number of the button that is no longer activated
  */
function stopTone(btn){
  document.getElementById("audio"+btn).pause();
}

// Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

window.onload = setTimer();  // Set the timer on page load so that the timer is correct
window.onload = setEasy();  // Set the mode on page load so that the mode explanation is correct

/**
  * Light up and show the picture on the specified button
  * @param {number} btn The number of the button that is being activated
  */
function lightButton(btn) {
  document.getElementById("button"+btn).classList.add("lit");  // Light up the button; Change its color
  document.getElementById("img"+btn).classList.remove("invisible");  // Show the image
}

/**
  * Clear the specified button by dimming it back down and hiding the image
  * @param {number} btn The number of the button that is no longer being activated
  */
function clearButton(btn) {
  document.getElementById("button"+btn).classList.remove("lit");  // Dim down the button; Change its color back
  document.getElementById("img"+btn).classList.add("invisible");  // Hide the image
}

/**
  * Play a single step of the clue by activating the specified button
  * @param {number} btn The number of the button that is being activated
  */
function playSingleClue(btn) {
  if(gamePlaying) {
    lightButton(btn);  // Light up the button and show its image
    playTone(btn, clueHoldTime);  // Play the tone associated with the specified button
    setTimeout(clearButton, clueHoldTime, btn);  // Clear the button after a certain amount of time, depending on the mode and turn number
  }
}

/**
  * Play the sequence of clues for the current step
  */
function playClueSequence() {
  guessCounter = 0;  // Initalize guessCounter to 0 at the start of the turn
  delay = nextClueWaitTime;  // Set delay to initial wait time
  
  for(let i = 0; i <= progress; i++) {  // For each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
    setTimeout(playSingleClue, delay, pattern[i]);  // Set a timeout to play that clue
    delay += clueHoldTime;  // Update the delay
    delay += cluePauseTime;
  }
  
  setTimeout(startTimer, delay);  // Start the timer once the clue has been played
  
  if(mode == 1) {  // If it is Hard Mode, reduce the clueHoldTime for the next turn
    clueHoldTime -= 100;
  }
}

/**
  * Stop the game and update the message to be the loss text
  */
function loseGame() {
  stopGame();
  document.querySelector("#message").textContent = "Aw, you lost. Nice try!"
}

/**
  * Stop the game and update the message to be the win text
  */
function winGame() {
  stopGame();
  document.querySelector("#message").textContent = "Congratulations, you won!"
}

/**
  * Handle the player's guess and start the next turn, if necessary
  * @param {number} btn The number of the button that the player guessed
  */
function guess(btn) {
  console.log("user guessed " + btn);
  
  if(!gamePlaying) {  // If the game is not being played, do not do anything
    return;
  }
  
  if(btn == pattern[guessCounter]) {  // Check if the player guessed the correct button
    // Correct Guess
    if(guessCounter == progress) {  // Check if it is the last guess of the turn
      // Last Guess of the Turn
      if(progress == pattern.length - 1) {  // Check if it is the last turn of the game
        // Last Turn of the Game
        winGame();  // If the player guess the correct button on the last guess of the last turn of the game, they have won
      } else {
        // It is not the last turn of the game, so continue to the next turn
        progress++;  // Increment progress
        resetTimer();
        playClueSequence();  // Start the next turn
      }
    } else {
      // It is not the last guess of this turn, so continue guessing for this turn
      guessCounter++;  // Increment the guess counter of this turn
    }
  } else {
    // Wrong Guess
    if(mode == 1) {
      // If the player makes a wrong guess in Hard Mode, they lose
      loseGame();
    } else {
      // If the player makes a wrong guess in Easy Mode, they have three strikes
      mistakes++;  // Increment mistakes and check what strike it is
      if(mistakes == 1) {  // Update the message to be the strike 1 text
        document.querySelector("#message").textContent = "Strike 1. Just one mistake, no worries.";
        resetTimer();
        playClueSequence();  // Play this turn's clue again
      } else if(mistakes == 2) {  // Update the message to be the strike 2 text
        document.querySelector("#message").textContent = "Strike 2. Last chance. You got this!";
        resetTimer();
        playClueSequence();  // Play this turn's clue again
      } else {  // It is strike 3, so the player loses
        loseGame();
      }
    }
  }
}

/**
  * Set variables to reflect the Easy Mode state
  */
function setEasy() {
  if(gamePlaying) {  // If a game is in progress, stop it
    stopGame();
  }
  document.getElementById("easyBtn").classList.add("selected");  // Show that the easy button is selected
  document.getElementById("hardBtn").classList.remove("selected");  // Show that the hard button is not selected
  document.querySelector("#message").textContent = "Repeat the pattern back to win the game!";  // Reset the text to normal after win/loss text
  document.getElementById("explainMode").innerHTML = "In Easy Mode, you have three strikes before you lose."  // Explain Easy Mode 
  mode = 0;
  setTimer();  // Set the timer to have the appropriate time for Easy Mode
}

/**
  * Set variabels to reflect the Hard Mode state
  */
function setHard() {
  if(gamePlaying) {  // If a game is in progress, stop it
    stopGame();
  }
  document.getElementById("easyBtn").classList.remove("selected");  // Show that the easy button is not selected
  document.getElementById("hardBtn").classList.add("selected");  // Show that the hard button is selected
  document.querySelector("#message").textContent = "Repeat the pattern back to win the game!";  // Reset the text to normal after win/loss text
  document.getElementById("explainMode").innerHTML = "In Hard Mode, you have no strikes, less time, and the clues get faster over time."  // Explain Hard Mode
  mode = 1;
  setTimer();  // Set the timer to have the appropriate time for Hard Mode
}

/**
  * Show the image of the button with the specified number
  * @param {number} num Number of the button with the desired image to be shown
  */
function showImg(num) {
  document.getElementById("img"+num).classList.remove("invisible");
}

/**
  * Hide the image of th ebutton with the specified number
  * @param {number} num Number of the button with the desired image to be hidden
  */
function hideImg(num) {
  document.getElementById("img"+num).classList.add("invisible");
}

/**
  * Set the time variable and the timer message
  */
function setTimer() {
  if(mode == 0) {  // Check the mode and set the time accordingly
    time = 15;
  } else {
    time = 8;
  }
  document.getElementById("time").innerHTML = time;  // Update the timer message with the appropriate time
}

/**
  * Start the timer and update the timer message every second
  */
function startTimer() {
  intervalID = setInterval(function() {
    time -= 1;  // Decrement the time variable every second
    document.getElementById("time").innerHTML = time;  // Update the timer message every second
    
    if(time <= 0) {  // If the player runs out of time, they lose
      loseGame();
    }
  }, 1000);  
}

/**
  * Reset the timer by clearing the interval and setting the timer to the starting state
  */
function resetTimer() {
  clearInterval(intervalID);  // Clear the decrement interval
  setTimer();  // Set the timer to the starting state
}