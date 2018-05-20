const columnHeight = 83;
const rowWidth = 101;

//Royalty Free Sounds - http://soundbible.com/1472-Depth-Charge.html
const crashMusic = new sound("music/Depth Charge-SoundBible.com-320539466.mp3");
//Royalty Free Sounds - http://soundbible.com/2067-Blop.html
const powerMusic = new sound("music/Blop-Mark_DiAngelo-79054334.mp3");


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
    this.width = rowWidth - 10
    this.height = columnHeight - 10
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
      //checks for reward collisions everytime update is run
      rewardCollisions (reward, player);
      //loops the enemy across the screen
      enemyLoop (allEnemies);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function (x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
}

// Now write your own player class
var Player = function (x,y){
  this.sprite = 'images/char-princess-girl.png';
  this.x = x;
  this.y = y;
  //height and width parameter needed to check collisions
  this.width = rowWidth - 40;
  this.height = columnHeight - 40;
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
    //clamp function restricts player movement to game board
    const ymove = columnHeight;
    const xmove = rowWidth ;

    const ymin = columnHeight;
    const ymax= columnHeight * 5;

    const xmin = 0;
    const xmax= rowWidth * 4;

    if (player.key == 38) {this.y = clamp(this.y - ymove, ymin, ymax)}
    if (player.key == 40) {this.y = clamp(this.y + ymove, ymin, ymax)}

    if (player.key == 37) {this.x = clamp(this.x - xmove, xmin, xmax)}
    if (player.key == 39) {this.x = clamp(this.x + xmove, xmin, xmax)}
}

Player.prototype.reset = function (x,y) {
    this.x = x;
    this.y = y;
};

var Reward = function (x,y){
  this.sprite = 'images/Key.png';
  this.x = x;
  this.y = y;
  this.width = 50
  this.height = 80
};

Reward.prototype.update = function(dt) {
  this.x * dt;
  this.y * dt;
};

Reward.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Reward.prototype.collect = function (x,y) {
    this.x = x;
    this.y = y;
};

Reward.prototype.reset = function (x,y) {
    this.x = x;
    this.y = y;
};


//Clamp function as seen at https://en.wikipedia.org/wiki/Clamping_(graphics)
// and https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

//defines what happens when enemies and players overlap at 2 points on either entity

//logic taken from explanation at https://stackoverflow.com/questions/23302698/java-check-if-two-rectangles-overlap-at-any-point
// also explanation of collisions by Karol here: https://discussions.udacity.com/t/a-study-in-javascript-frogger-arcade-game-clone/38871/15
function checkCollisions (allEnemies, player) {
    for(var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x < player.x + player.width &&
            allEnemies[i].y < player.y + player.height &&
	          player.x < allEnemies[i].x + allEnemies[i].width &&
	          player.y < allEnemies[i].height + allEnemies[i].y) {
           //play sound on collision with enemy.
           crashMusic.play();
           resetGame ();
    	}
    }
}

function enemyLoop (allEnemies) {
    for(var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x > 460) {
           //reset enemy to original x and y coordinates and speed to restart loop
           allEnemies[i].reset(-100, allEnemies[i].y, allEnemies[i].speed);
    	}
    }
}


function rewardCollisions (reward, player) {
    //for(var j = 0; j < allRewards.length; j++) {
        if (reward.x < player.x + player.width &&
            reward.y < player.y + player.height &&
	          player.x < reward.x + reward.width &&
	          player.y < reward.height + reward.y) {
           //play sound on collision with reward
           powerMusic.play();
           //reward disappears
           reward.collect(600, 600);
           showModal()
    	//}
    }
}



function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function resetGame (){
  player.reset(200,330);
  reward.reset(300, 70);
  for(var i = 0; i < allEnemies.length; i++) {
         //reset enemy to original x and y coordinates and speed to restart loop
         allEnemies[i].reset(-100, allEnemies[i].y, allEnemies[i].speed);
    }
}

function stopGame (){
  player.reset(player.x,player.y);
  reward.reset(reward.x, reward.y);
  for(var i = 0; i < allEnemies.length; i++) {
         //reset enemy to original x and y coordinates and speed to restart loop
         allEnemies[i].reset( allEnemies[i].x, allEnemies[i].y, allEnemies[i].speed);
    }
}


// Now instantiate your objects.
var enemy1 = new Enemy( -100, 60, 30);
var enemy2 = new Enemy( -100, 140, 150);
var enemy3 = new Enemy( -100, 230, 70);

// Place all enemy objects in an array called allEnemies
const allEnemies = [ enemy1, enemy2, enemy3 ];

// Place the player object in a variable called player
var player = new Player(columnHeight*2.5,rowWidth*3.25);

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

var reward = new Reward(300,70);

// Modal HTML by https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById("arcadeModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the button that closes the modal and rests the game
var modalButton = document.getElementById("btn");

function showModal() {
    modal.style.display = "block";
    stopGame ()
}
// When the user clicks on button, close the modal, reset the game
modalButton.onclick = function() {
    modal.style.display = "none";
    resetGame();
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



//references:
//https://www.w3schools.com/graphics/game_controllers.asp
