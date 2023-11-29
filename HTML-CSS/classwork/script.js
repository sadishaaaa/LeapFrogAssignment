const circle = document.getElementById("circle");
// const getRandom={

// }
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.element = document.createElement("div");
    this.element.setAttribute("class", "circle");
  }
  draw() {
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
    circle.appendChild(this.element);
  }
}

function getRandom(min = 0, max = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}
for (let i = 0; i < 100; i++) {
  const point = new Point(getRandom(0, 490), getRandom(0, 490));

  point.draw();
}
