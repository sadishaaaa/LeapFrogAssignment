const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//giving height and width to canvas
canvas.width = 1024;
canvas.height = 576;

let y = 100;
let y2 = 100;

class Player {
  constructor(position) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.height = 100;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 100, this.height);
  }
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += GRAVITY;
    else this.velocity.y = 0;
  }
}
const player = new Player({
  x: 0,
  y: 0,
});
const player2 = new Player({
  x: 300,
  y: 100,
});
function animate() {
  window.requestAnimationFrame(animate);
  //giving color to rectangle
  c.fillStyle = "white";
  // drawing rectangle x ,y, width, height
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  player2.update();
}

//activating anumation loop
animate();
