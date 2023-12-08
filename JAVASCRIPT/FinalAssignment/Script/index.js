document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("ballCanvas");
  const ctx = canvas.getContext("2d");
  const ballRadius = 20;
  const balls = [];
  const numRows = 5;
  const numCols = 14;
  const shooterRadius = ballRadius;

  // Array of colors
  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ff00ff",
    "#00ffff",
    "#FF9933",
  ];

  // Function to get a random color from the array
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Generate interconnected balls with a reduced gap between rows
  for (let i = 0; i < numRows; i++) {
    balls[i] = [];
    for (let j = 0; j < numCols; j++) {
      const ball = {
        x: 15 + j * 2 * ballRadius + ballRadius + (i % 2) * ballRadius,
        y: 30 + i * 1.7 * ballRadius, // Reduce the vertical gap
        color: getRandomColor(),
        connected: false,
        draw: function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, ballRadius, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.closePath();
        },
      };
      balls[i][j] = ball;
    }
  }

  // Shooter objects
  const shooters = [
    {
      x: canvas.width / 3,
      y: canvas.height - shooterRadius,
      color: getRandomColor(),
      stuckBalls: [],
    },
    {
      x: (2 * canvas.width) / 3,
      y: canvas.height - shooterRadius,
      color: getRandomColor(),
      stuckBalls: [],
    },
  ];

  // Draw the balls
  function drawBalls() {
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (balls[i][j]) {
          balls[i][j].draw();
        }
      }
    }
  }

  // Draw the shooters
  function drawShooters() {
    for (const shooter of shooters) {
      ctx.beginPath();
      ctx.arc(shooter.x, shooter.y, shooterRadius, 0, Math.PI * 2);
      ctx.fillStyle = shooter.color;
      ctx.fill();
      ctx.closePath();

      // Draw stuck balls
      for (const stuckBall of shooter.stuckBalls) {
        stuckBall.draw();
      }
    }
  }

  // Function to handle shooting
  function shoot(shooter) {
    const ballToShoot = balls[numRows - 1][Math.floor(numCols / 2)]; // Adjust as needed

    if (ballToShoot) {
      ballToShoot.y = shooter.y - shooterRadius - ballRadius;
      shooter.stuckBalls.push(ballToShoot);

      // Move the shooter ball upward
      shooter.y -= ballRadius;
    }
  }

  // Handle key press event for shooting
  document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      shoot(shooters[0]); // Adjust as needed
    }
  });

  // Swap shooters using translate property
  function swapShooters() {
    const tempX = shooters[0].x;
    shooters[0].x = shooters[1].x;
    shooters[1].x = tempX;
  }

  // Handle key press event for swapping shooters
  document.addEventListener("keydown", (event) => {
    if (event.key === "s") {
      swapShooters();
    }
  });

  // Call draw function repeatedly
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBalls();
    drawShooters();
    requestAnimationFrame(gameLoop);
  }

  // Start the game loop
  gameLoop();
});
