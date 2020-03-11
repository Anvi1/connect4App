# connect4Game
 I have used AngularJS because this project is single page application and lightweight. There is no need to develop it through component based architecture, else it would be a bit heavy corresponding to the task.
 
 Installation Dependencies:
 
 1)Download the project
 
 2)Run the command on terminal to download node modules --> npm install
 
 3)Open app.html file on chrome browser
 
 Run Test Cases:
 
 1)Open Terminal
 
 2)Run this command --> karma start karma.conf.js
 
 

About the game:

The aim for both players is to make a straight line of four own pieces; the line can be vertical, horizontal or diagonal. Each player has 21 pieces of his/her own color to start the game with. 

At the beginning the game decides randomly which player will start first; moves are made alternatively, one by turn.  

Move entails in placing new pieces on the board; pieces slide downwards from upper holes, falling to the last row or piling up on the last piece introduced in the same column. So, in every turn the introduced piece may be placed at most on seven different squares. The winner is the first player who gets a straight made with four own pieces and no gaps between them. 

Variation – Pop Out 

In this variation, a player has another type of move to make: popping out a piece of his/her color from the bottom row. So popping a piece out from the bottom drops every disc above it down one space.  A popped out piece goes back to the player and can be used in subsequent turns. 

Please note considering that the same player needs to place the new piece at any position just after popping.
