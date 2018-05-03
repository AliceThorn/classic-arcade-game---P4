// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speedX = 50
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
      this.x += this.speedX * dt
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
this.speedX = 0
this.speedY = 0
};

// This class requires an update(), render() and
Player.prototype.update = function(dt) {
//this.y -= this.speedY * dt

};
Player.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// a handleInput() method.
Player.prototype.handleInput = function(allowedKeys) {
//37 = player.speedX -= 1;
//38 = player.speedY -= 1
//39 = player.speedX += 1
//40 = player.speedY += 1
};

// Now instantiate your objects.
var enemy1 = new Enemy( 0,60);
var enemy2 = new Enemy( 0, 140);
var enemy3 = new Enemy( 0, 230);

// Place all enemy objects in an array called allEnemies
const allEnemies = [ enemy1, enemy2, enemy3 ]
// Place the player object in a variable called player
var player = new Player(200,330);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//Help sought from:
//https://www.w3schools.com/graphics/game_controllers.asp
