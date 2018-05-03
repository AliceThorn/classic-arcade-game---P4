// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    //height and width parameter needed to check collisions
    this.width = 100
    this.height = 170
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
      this.x += this.speed * dt
      //checks for collisions everytime update is run
      checkCollisions (allEnemies, player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
var Player = function (x,y){
this.sprite = 'images/char-princess-girl.png'
this.x = x;
this.y = y;
//height and width parameter needed to check collisions
this.width = 100
this.height = 170
};

// This class requires an update(), render() and
Player.prototype.update = function(dt) {
this.x * dt;
this.y * dt;

};
Player.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.

//Code similar to as seen at https://www.w3schools.com/graphics/game_controllers.asp
Player.prototype.handleInput = function(allowedKeys) {
    if (player.key == 37) {this.x -= 100; }
    if (player.key == 38) {this.y -= 100; }
    if (player.key == 39) {this.x += 100; }
    if (player.key == 40) {this.y += 100; }

    //do not allow player to reach the water
    //resetPlayer function(){}
    //do not allow player to fall off game board
};

// Now instantiate your objects.
var enemy1 = new Enemy( -100,60,70);
var enemy2 = new Enemy( -100, 140,150);
var enemy3 = new Enemy( -100, 230,30);

// Place all enemy objects in an array called allEnemies
const allEnemies = [ enemy1, enemy2, enemy3 ]
// Place the player object in a variable called player
var player = new Player(200,330);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  player.key = e.keyCode;
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollisions (allEnemies, player) { // capitalize the the first letter of Collisions
    for(var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width &&
	    allEnemies[i].x + allEnemies[i].width > player.x &&
	    allEnemies[i].y < player.y + player.height &&
	    allEnemies[i].height + allEnemies[i].y > player.y) {
	    player.reset(200,330); // call the reset method on the player object and not on the Player constructor, pass x and y coordinates to the reset method
    	}
    } // put the closing curly brace here
}




Player.prototype.reset = function (x,y) {
    this.x = x;
    this.y = y;
}


//Help sought from:
//https://www.w3schools.com/graphics/game_controllers.asp
