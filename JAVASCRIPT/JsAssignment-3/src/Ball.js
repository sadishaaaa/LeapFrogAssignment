class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = getRandomNumber(-1, 1);
    this.dy = getRandomNumber(-1, 1);
    this.element = document.createElement("div");
    this.element.style.width = this.r * 2 + "px";
    this.element.style.height = this.r * 2 + "px";
    this.element.style.backgroundColor = getRandomColor();
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
  // move ball towards the direction
  move = () => {
    this.x += this.dx * SPEED;
    this.y += this.dy * SPEED;
  };
  //   update position of the ball element
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
    if (this.x < boundaryLeft || this.x + this.r * 2 > boundaryWidth) {
      // this.dx *= -1;
      this.dx = -this.dx;
      this.x =
        this.x <= boundaryLeft ? boundaryLeft : boundaryWidth - this.r * 2;
    }
    if (this.y < boundaryTop || this.y + this.r * 2 > boundaryHeight) {
      // this.dy *= -1;
      this.dy = -this.dy;
      this.y =
        this.y <= boundaryTop ? boundaryTop : boundaryHeight - this.r * 2;
    }
  };
  checkBallCollision = (ball) => {
    const dist = distance(this.x, this.y, ball.x, ball.y);
    const sumOfRadius = this.r + ball.r;
    if (dist <= sumOfRadius) {
      // this.dx = -this.dx;
      // this.dy = -this.dy;
      // ball.dx = ball.dx;
      // ball.dy = ball.dy;
      const tx = this.dx;
      const ty = this.dy;
      this.dx = ball.dx;
      this.dy = ball.dy;
      ball.dx = tx;
      ball.dy=ty;
      let penetration = sumOfRadius - dist;
      const penetrationX = ((this.x - ball.x) / dist) * penetration * 0.5;
      const penetrationY = ((this.y - ball.y) / dist) * penetration * 0.5;
      this.x += penetrationX;
      this.y += penetrationY;
      ball.x -= penetrationX;
      ball.y == penetrationY;
    }
  };
  
  
}
