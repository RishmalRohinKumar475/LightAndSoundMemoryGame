# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Rishmal Rohin Kumar

Time spent: 10 hours spent in total

Link to project: https://glitch.com/edit/#!/light-and-sound-memory-game-rishmal?path=README.md%3A7%3A14

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [X] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [X] Game button appearance change goes beyond color (e.g. add an image)
* [X] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [X] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [X] List anything else that you can get done to improve the app!
    
- I made two separate modes: Easy and Hard. Both modes include 8 buttons and a randomized pattern for every game.
  Easy mode gives the player 3 strikes, 15 seconds for each turn, and the playback is a constant 1 second per button throughout.
  Hard mode gives the player 1 strike (one wrong guess means they lose), 8 seconds for each turn, and the playback speeds up
  by 100 ms every turn. 

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![http://g.recordit.co/MnON82b0KT.gif](your-link-here)
<br><img src="http://g.recordit.co/MnON82b0KT.gif"><br>


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

w3schools, stackoverflow, developer.mozilla.org, Quora, My own old work from an online Udemy course

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

The biggest challenges for me came showing an image for the button presses, and the timer. Showing an image on the button press was not difficult by itself, but the challenge came in discovering the visibility property. At first, I was using a class with display: none in CSS to hide the image and removing that class to show the image. I solved this problem by looking online and finding out that visibility property could also be used to hide images, and adding and removing a class with visibility: hidden did not move the button and image down. The most significant challenge for me was definitely the timer, as it took up at least 5 of the 10 hours I spent on this project. I had a lot of trouble trying to find a way of approaching this problem in a way that would work. At first, I wanted to use setInterval to call a checkTime function every x seconds to see if the player had guessed enough times to match the turn number. This method proved much too complicated and difficult. I ended up solving my issue by focusing on creating the countdown timer first. I had always planned to do the countdown timer by using setInterval and decrementing a time variable every second, but actually implementing it made me realize that I could just check when the time <= 0 and say that the player lost then. Also, implementing the timer was somewhat difficult. At first, I tried hard coding the number 15 in HTML so that I could have it show when the web page first loaded up. But, this caused problems when trying to decrement the time. After looking online for a bit, I found the window.onload function in JavaScript and used that to set the timer text in HTML using a variable rather than hard coding. Additionally, I experienced a weird bug with the timer related to starting and stopping the game very quickly that I cited in my comments. If I started and stopped the game very quickly, in the time it would take for the first clue to be played, the timer would start to decrement despite the fact that I reset the timer on clicking the stop button. I found out that because my startTimer call was delayed by the time it takes to play the clue, the resetTimer function call would happen before the timer was even started, so the clearInterval would try to clear the interval that had not been set yet. As such, I added an additional resetTimer call after the time it takes to play the clue as well.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

After finishing this submission, I do not have too many questions regarding HTML, CSS, and JavaScript themselves because I have worked with these languages before. I would like to learn more about JavaScript event handlers and when it is better to use those compared to the onclick, onmouseup, onmousedown, etc. properties of HTML tags. Additionally, I would like to know when it is better or common to use the script tag in HTML instead of creating a separate JavaScript file. I assume it is when you only need a small amount of JavaScript code, but how often does that situation arise in the industry? My main questions are related to how these languages function in the overall process of web development. Clearly, these languages are used to create the front-end website that people can see. I assume languages like Java and Python can be used to make the back-end algorithms and other functionality. But, HTML, CSS, and JavaScript only work when someone has access to those files. How does a website actually get put on the internet for anyone to access, without relying on files?

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I had more time to work on this project, I would probably re-write the playSingleClue and playClueSequence functions because they are very different from how I would write a function and are somewhat confusing for me. I am glad I got to work with them because it improves my ability to read and process code that is unfamiliar to me, but I would still like to write them in a way that makes more sense to me. Additionally, I would like to find some way of making the colors, pictures, and sound effects all related. Currently, the images I have are of fruits of the same color as their associated buttons, but the sound effects are completely random and unrelated, which I do not like. In terms of additional features, I would like to add a medium mode that finds some middle ground to the easy and hard mode. Also, I would like to make an extreme mode that has many more buttons, goes very quickly, and has a much longer pattern. Another feature I would add is the ability to turn off colors, images, and/or sounds so that the game would be more challenging for the player. 



## License

    Copyright [Rishmal Rohin Kumar]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.