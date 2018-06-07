// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //make enemies loops to left side of canvas after reaching canvas.width
    if (this.x >= 505) {
        this.x = 0;
    }

    //Check for collision with enemies of barrier-walls
    checkCollision(this);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // function not neeed right now
}

// Renders player on the screen
// Displays the score
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);
}:

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'right') {
        player.x = += player.speed;
    }
    if (keyPress == 'up') {
        player.y += player.speed - 20;
    }
    if (keyPress == 'down') {
        player.y = player.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};
// Function to display player's score
let displayScoreLevel = function(aScore, aLevel) {
    let canvas = document.getElementsByTagName('canvas');
    let firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevelDiv.innerHTML = 'Score: ' + sScore + ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

let checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (player.y + 131 >= anEnemy.y + 90 && player.x + 25 <= anEnemy.x + 88 && player.y + 23 <= anEnemy.y + 135 && player.x + 76 >= anEnemy.x + 11) {
        console.log('collided');
        player.x = 202.5;
        player.y = 383;
    }

    // check for player reaching top of canvas and winning the game, if player wins, add 1 to the score and level.
    // pass score as an argument to the increasesDifficulty function
    if (player.x + 63 <= 0) {
        player.x = 202.5;
        player.y = 383;
        console.log('You made it!');

        ctx.fillsStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('Current Score: ' + score + ', Current Level: ' + gameLevel);
        increasesDifficulty(score);
    }

    // check if player runs into left, bottom or right canvas walls, prevent player from oving beyond wall boundaries
    if (player.y > 383) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

//Increase the number of enemies on screen based on the player's score
let increasesDifficulty = function(numEnemies) {
    //remove all previous enemies on canvas
    allEnemies.length = 0;

    //load new set of enemies
    for (let i = 0; i <= numEnemies; i++) {
        let enemy = new Enemy(0, Math.random() * 184, Math.random() * 256);

        allEnemies.push(enemy);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Enemy randomly placed vertically within sections of canvas
// Declare new score and gameLevel variables to store score and level
let allEnemies = [];
let player = new Player(202.5, 383, 50);
let score  = 0;
let gameLevel = 1;
let scoreLevelDiv = document.createElement('div');
let enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});