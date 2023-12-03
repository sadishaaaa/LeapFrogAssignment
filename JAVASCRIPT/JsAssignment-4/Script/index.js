class DoodleJumpGame {
  constructor() {
    // Board dimensions
    this.board = null;
    this.boardWidth = 360;
    this.boardHeight = 576;
    this.context = null;

    // Doodler dimensions and initial position
    this.doodlerWidth = 46;
    this.doodlerHeight = 46;
    this.doodlerX = this.boardWidth / 2 - this.doodlerWidth / 2;
    this.doodlerY = (this.boardHeight * 7) / 8 - this.doodlerHeight;

    // Doodler images
    this.doodlerRightImg = null;
    this.doodlerLeftImg = null;

    // Doodler object
    this.doodler = {
      img: null,
      x: this.doodlerX,
      y: this.doodlerY,
      width: this.doodlerWidth,
      height: this.doodlerHeight,
    };

    // Physics properties
    this.velocityX = 0;
    this.velocityY = 0;
    this.initialVelocityY = -8;
    this.gravity = 0.4;

    // Platforms
    this.platformArray = [];
    this.platformWidth = 60;
    this.platformHeight = 18;
    this.platformImg = null;

    // Score and game state
    this.score = 0;
    this.maxScore = 0;
    this.gameOver = false;

    // Tilt controls sensitivity
    this.tiltThreshold = 5;

    // Bind methods to ensure 'this' refers to the class instance
    this.handleOrientation = this.handleOrientation.bind(this);
  }

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

    // Check if the device supports orientation events
    if (window.DeviceOrientationEvent) {
      // Add event listener for device orientation changes
      window.addEventListener("deviceorientation", (event) =>
        this.handleOrientation(event)
      );
    } else {
      // Provide a message if orientation events are not supported
      console.log("Device orientation not supported.");
    }
  }

  handleOrientation(event) {
    // Ensure that the event has the beta property (tilt left/right)
    if (event.beta !== null) {
      // Use the beta value to determine the tilt direction
      // Adjust the velocityX accordingly to move the doodler left or right
      if (event.beta < -this.tiltThreshold) {
        this.velocityX = -4;
        this.doodler.img = this.doodlerLeftImg;
      } else if (event.beta > this.tiltThreshold) {
        this.velocityX = 4;
        this.doodler.img = this.doodlerRightImg;
      } else {
        // If the tilt is within the threshold, stop the doodler
        this.velocityX = 0;
      }
    }
  }

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

  moveDoodler(e) {
    if (e.code == "ArrowRight" || e.code == "KeyD") {
      this.velocityX = 4;
      this.doodler.img = this.doodlerRightImg;
    } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
      this.velocityX = -4;
      this.doodler.img = this.doodlerLeftImg;
    } else if (e.code == "Space" && this.gameOver) {
      this.resetGame();
    }
  }

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

  detectCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

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

  resetGame() {
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

// Create an instance of DoodleJumpGame and initialize the game.
const game = new DoodleJumpGame();
game.initialize();
