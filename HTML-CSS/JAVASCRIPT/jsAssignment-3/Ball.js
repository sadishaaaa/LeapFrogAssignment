class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = getRandomNumber(-1, 1);
    this.dy = getRandomNumber(-1, 1);
    this.element = document.createElement("div");
    this.element.classList.add("ball");
  }
  getElement() {
    return this.element;
  }
  getX = () => this.x;
  getY = () => this.y;
  setX = () => {
    this.X = x;
  };
  setY = () => {
    this.y = y;
  };
  // ?move ball towards the direction
  move = () => {
    this.x += this.dx * SPEED;
    this.y += this.dy * SPEED;
  };
  //   ypdate position of the ball element
  draw = () => {
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
  };
  checkWallCollision = (
    boundaryLeft,
    boundaryTop,
    boundaryWidth,
    boundaryHeight
  ) => {
    if (this.x < boundaryLeft || this.x + BALL_WIDTH > boundaryWidth) {
      this.dx *= -1;
    }
    if (this.y < boundaryTop || this.y + BALL_HEIGHT > boundaryHeight) {
      this.dy *= -1;
    }
  };
  checkBallCollision = (ball) => {
    const dist = distance(this.x, this.y, ball.x, ball.y);
    const sumOfRadius = this.r + ball.r;
    if (dist <= sumOfRadius) {
      this.dx = -this.dx;
      this.dy = -this.dy;
      ball.dx = ball.dx;
      ball.dy = ball.dy;
    }
  };
}
