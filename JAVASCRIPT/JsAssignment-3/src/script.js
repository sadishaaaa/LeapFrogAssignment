const viewport = document.querySelector(".viewport");
const ballsArray = [];
for (let i = 0; i < BALL_COUNT; i++) {
  const r = getRandomNumber(MIN_RADIUS, MAX_RADIUS);
  const x = getRandomNumber(0, VIEWPORT_WIDTH - r * 2);
  const y = getRandomNumber(0, VIEWPORT_HEIGHT - r * 2);
  const ball = new Ball(x, y, r);
  ball.element.style.width = r * 2 + "px";
  ball.element.style.height = r * 2 + "px";
  ballsArray.push(ball);
}
//add balls in viewport
ballsArray.forEach((ball) => {
  viewport.appendChild(ball.getElement());
});
// new Date();
//
function render() {
  ballsArray.forEach((ball) => {
    ball.draw();
    ball.move();
    ball.checkWallCollision(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    ballsArray.forEach((otherBall) => {
      if (ball == otherBall) return;
      ball.checkBallCollision(otherBall);
    });
  });
  requestAnimationFrame(render);
}
render();
