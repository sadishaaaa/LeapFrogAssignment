/**
 * DoodleJumpGame Class
 *
 * This class represents the implementation of the Doodle Jump game. It encapsulates
 * the game's state, rendering, and logic. The game features a doodler that can move
 * left and right, jump on platforms, and accumulates scores. The game ends when the
 * doodler falls off the bottom of the viewport. Players can restart the game by
 * pressing the 'Space' key.
 */
class DoodleJumpGame {
  // Constructor to initialize properties and set default values
  constructor() {
    // Canvas and board dimensions
    this.board = null;
    this.boardWidth = 360;
    this.boardHeight = 576;
    this.context = null;

    // Doodler properties
    this.doodlerWidth = 46;
    this.doodlerHeight = 46;
    this.doodlerX = this.boardWidth / 2 - this.doodlerWidth / 2;
    this.doodlerY = (this.boardHeight * 7) / 8 - this.doodlerHeight;
    this.doodlerRightImg = null;
    this.doodlerLeftImg = null;
    this.doodler = {
      img: null,
      x: this.doodlerX,
      y: this.doodlerY,
      width: this.doodlerWidth,
      height: this.doodlerHeight,
    };

    // Doodler movement properties
    this.velocityX = 0;
    this.velocityY = 0;
    this.initialVelocityY = -8;
    this.gravity = 0.4;

    // Platforms properties
    this.platformArray = [];
    this.platformWidth = 60;
    this.platformHeight = 18;
    this.platformImg = null;

    // Scoring and game state
    this.score = 0;
    this.maxScore = 0;
    this.gameOver = false;
    //  for tilt controls sensitivity
    this.tiltThreshold = 5;
    this.handleOrientation = this.handleOrientation.bind(this);
  }

  // Initialize the game, set up canvas, images, and event listeners
  initialize() {
    this.board = document.getElementById("viewport");
    this.board.height = this.boardHeight;
    this.board.width = this.boardWidth;
    this.context = this.board.getContext("2d");

    this.doodlerRightImg = new Image();
    this.doodlerRightImg.src = "./Assets/Img/doodler-right.png";
    this.doodler.img = this.doodlerRightImg;
    this.doodlerRightImg.onload = () => {
      this.context.drawImage(
        this.doodler.img,
        this.doodler.x,
        this.doodler.y,
        this.doodler.width,
        this.doodler.height
      );
    };

    this.doodlerLeftImg = new Image();
    this.doodlerLeftImg.src = "./Assets/Img/doodler-left.png";

    this.platformImg = new Image();
    this.platformImg.src = "./Assets/Img/platform.png";

    this.velocityY = this.initialVelocityY;
    this.placePlatforms();
    requestAnimationFrame(() => this.update());
    document.addEventListener("keydown", (e) => this.moveDoodler(e));
    window.addEventListener("deviceorientation", this.handleOrientation);
  }

  // Main game loop responsible for updating and rendering game elements
  update() {
    requestAnimationFrame(() => this.update());
    if (this.gameOver) {
      return;
    }
    this.context.clearRect(0, 0, this.board.width, this.board.height);

    this.doodler.x += this.velocityX;
    if (this.doodler.x > this.boardWidth) {
      this.doodler.x = 0;
    } else if (this.doodler.x + this.doodler.width < 0) {
      this.doodler.x = this.boardWidth;
    }

    this.velocityY += this.gravity;
    this.doodler.y += this.velocityY;
    if (this.doodler.y > this.board.height) {
      this.gameOver = true;
    }
    this.context.drawImage(
      this.doodler.img,
      this.doodler.x,
      this.doodler.y,
      this.doodler.width,
      this.doodler.height
    );

    for (let i = 0; i < this.platformArray.length; i++) {
      let platform = this.platformArray[i];
      if (this.velocityY < 0 && this.doodler.y < (this.boardHeight * 3) / 4) {
        platform.y -= this.initialVelocityY;
      }
      if (this.detectCollision(this.doodler, platform) && this.velocityY >= 0) {
        this.velocityY = this.initialVelocityY;
      }
      this.context.drawImage(
        platform.img,
        platform.x,
        platform.y,
        platform.width,
        platform.height
      );
    }

    while (
      this.platformArray.length > 0 &&
      this.platformArray[0].y >= this.boardHeight
    ) {
      this.platformArray.shift();
      this.newPlatform();
    }

    this.updateScore();
    this.context.fillStyle = "black";
    this.context.font = "16px sans-serif";
    this.context.fillText(this.score, 5, 20);

    if (this.gameOver) {
      this.context.fillText(
        "Game Over: Press 'Space' to Restart",
        this.boardWidth / 7,
        (this.boardHeight * 7) / 8
      );
    }
  }

  // Handles keyboard input to move the doodler and restart the game
  moveDoodler(e) {
    if (window.innerWidth >= 768) {
      // Existing keyboard controls
      if (e.code == "ArrowRight" || e.code == "KeyD") {
        this.velocityX = 4;
        this.doodler.img = this.doodlerRightImg;
      } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
        this.velocityX = -4;
        this.doodler.img = this.doodlerLeftImg;
      } else if (e.code == "Space" && this.gameOver) {
        this.doodler = {
          img: this.doodlerRightImg,
          x: this.doodlerX,
          y: this.doodlerY,
          width: this.doodlerWidth,
          height: this.doodlerHeight,
        };

        this.velocityX = 0;
        this.velocityY = this.initialVelocityY;
        this.score = 0;
        this.maxScore = 0;
        this.gameOver = false;
        this.placePlatforms();
      }
    }
  }

  // Places initial platforms for the game
  placePlatforms() {
    this.platformArray = [];

    let platform = {
      img: this.platformImg,
      x: this.boardWidth / 2,
      y: this.boardHeight - 50,
      width: this.platformWidth,
      height: this.platformHeight,
    };

    this.platformArray.push(platform);

    for (let i = 0; i < 6; i++) {
      let randomX = Math.floor((Math.random() * this.boardWidth * 3) / 4);
      let platform = {
        img: this.platformImg,
        x: randomX,
        y: this.boardHeight - 75 * i - 150,
        width: this.platformWidth,
        height: this.platformHeight,
      };

      this.platformArray.push(platform);
    }
  }

  // Generates a new platform to replace those that have moved off-screen
  newPlatform() {
    let randomX = Math.floor((Math.random() * this.boardWidth * 3) / 4);
    let platform = {
      img: this.platformImg,
      x: randomX,
      y: -this.platformHeight,
      width: this.platformWidth,
      height: this.platformHeight,
    };

    this.platformArray.push(platform);
  }

  // Checks for collision between two objects a and b
  detectCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  // Updates the player's score based on the doodler's vertical movement
  updateScore() {
    let points = Math.floor(50 * Math.random());
    if (this.velocityY < 0) {
      this.maxScore += points;
      if (this.score < this.maxScore) {
        this.score = this.maxScore;
      }
    } else if (this.velocityY >= 0) {
      this.maxScore -= points;
    }
  }
}

// Create an instance of DoodleJumpGame and initialize the game.
const game = new DoodleJumpGame();
game.initialize();
