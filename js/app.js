const columnHeight = 83;
const rowWidth = 101;

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


// Now write your own player class
var Player = function (x,y){
this.sprite = 'images/char-princess-girl.png'
this.x = x;
this.y = y;
//height and width parameter needed to check collisions
this.width = rowWidth - 40
this.height = columnHeight - 40
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
    const ymove = columnHeight
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
//Clamp function as seen at https://en.wikipedia.org/wiki/Clamping_(graphics) and
https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment
function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}



// Now instantiate your objects.
var enemy1 = new Enemy( -100,60,30);
var enemy2 = new Enemy( -100, 140,150);
var enemy3 = new Enemy( -100, 230,70);

// Place all enemy objects in an array called allEnemies
const allEnemies = [ enemy1, enemy2, enemy3 ]
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
           //Puff of smoke
           //explosion.puff(player.x-100, player.y-50)
           //reset player to original x and y coordinates
           player.reset(200,330);
    	}
    }
}

Player.prototype.reset = function (x,y) {
    this.x = x;
    this.y = y;
}

function enemyLoop (allEnemies) {
    for(var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].x > 460) {
           //reset enemy to original x and y coordinates and speed to restart loop
           allEnemies[i].reset(-100, allEnemies[i].y, allEnemies[i].speed);
    	}
    }
}

Enemy.prototype.reset = function (x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
}

var Explosion = function (x,y){
this.sprite = 'images/pink-smoke-3.png'
this.x = x;
this.y = y;
};

Explosion.prototype.update = function(dt) {
this.x * dt;
this.y * dt;

};

Explosion.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var explosion = new Explosion(600, 600);

Explosion.prototype.puff = function (x,y) {
    this.x = x;
    this.y = y;
}


var Reward = function (x,y){
this.sprite = 'images/Key.png'
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

var reward = new Reward(300,150);

function rewardCollisions (reward, player) {
    //for(var i = 0; i < allEnemies.length; i++) {
        if (reward.x < player.x + player.width &&
            reward.y < player.y + player.height &&
	          player.x < reward.x + reward.width &&
	          player.y < reward.height + reward.y) {
           //play sound on collision with reward
           powerMusic.play();
           //reward disappears
           reward.collect(600, 600)
    	//}
    }
}

Reward.prototype.collect = function (x,y) {
    this.x = x;
    this.y = y;
}

Reward.prototype.reset = function (x,y) {
    this.x = x;
    this.y = y;
}

Explosion.prototype.reset = function (x,y) {
    this.x = x;
    this.y = y;
}



//Royalty Free Sounds - http://soundbible.com/1472-Depth-Charge.html
const crashMusic = new sound("music/Depth Charge-SoundBible.com-320539466.mp3");
//Royalty Free Sounds - http://soundbible.com/2067-Blop.html
const powerMusic = new sound("music/Blop-Mark_DiAngelo-79054334.mp3");

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
  reward.reset(300, 150);
  explosion.puff(600, 600);
}

function gameStart (){
  player.reset(200,330);
  reward.reset(300, 150);
  explosion.puff(600, 600);
  allEnemies[i].reset(-100, allEnemies[i].y, allEnemies[i].speed);
}

function gamePause(){
  player.stop(player.x, player.y);
  for(var i = 0; i < allEnemies.length; i++) {
  allEnemies[i].stop(allEnemies[i].x,allEnemies[i].y,0);
}}

Player.prototype.stop = function (x,y) {
    this.x = x;
    this.y = y;
}
Enemy.prototype.stop = function (x,y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
}


//http://blog.sklambert.com/html5-game-tutorial-game-ui-canvas-vs-dom/
document.querySelectorAll('.play')[0].addEventListener('click', function(event) {
   resetGame();
});
document.querySelectorAll('.pause')[0].addEventListener('click', function(event) {
   gamePause();
});
document.querySelectorAll('.restart')[0].addEventListener('click', function(event) {
   resetGame();
});


//references:
//https://www.w3schools.com/graphics/game_controllers.asp
