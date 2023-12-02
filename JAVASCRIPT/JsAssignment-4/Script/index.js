const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//giving height and width to canvas
canvas.width = 1024;
canvas.height = 576;

let y = 100;
let y2 = 100;

const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};
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
    this.position.x += this.velocity.x;
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
const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./Script/background.png",
});

function animate() {
  window.requestAnimationFrame(animate);
  //giving color to rectangle
  c.fillStyle = "white";
  // drawing rectangle x ,y, width, height
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.scale(4, 4);
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  c.restore();
  player.update();
  player2.update();

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 5;
  else if (keys.a.pressed) player.velocity.x = -5;
}

//activating anumation loop
animate();
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -10;
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
