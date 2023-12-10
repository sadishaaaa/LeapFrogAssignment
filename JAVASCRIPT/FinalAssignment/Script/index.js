const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const grid = 32;

// each even row is 8 bubbles long and each odd row is 7 bubbles long.

let currentLevel = 0;

const colorMap = {
  R: "red",
  G: "green",
  B: "blue",
  Y: "yellow",
  O: "orange",
  // P: "purple",
  S: "Skyblue",

  // P: "Pink",
  // RA: "rainbow",
};
const colors = Object.values(colorMap);

// use a 3px gap between each bubble
const bubbleGap = 3;

// the size of the outer walls for the game
const wallSize = 6;
const bubbles = [];
let particles = [];

//  function to convert deg to radians
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

// rotate a point by an angle
function rotatePoint(x, y, angle) {
  let sin = Math.sin(angle);
  let cos = Math.cos(angle);

  return {
    x: x * cos - y * sin,
    y: x * sin + y * cos,
  };
}
// Function to initialize the bubble grid based on the current level
function initializeBubbleGrid() {
  bubbles.length = 0; // Clear existing bubbles

  const currentLevelLayout = levels[currentLevel];

  for (let row = 0; row < currentLevelLayout.length; row++) {
    for (let col = 0; col < currentLevelLayout[row].length; col++) {
      const color = currentLevelLayout[row][col];
      createBubble(col * grid, row * grid, colorMap[color]);
    }
  }
}
// Function to switch to the next level
function nextLevel() {
  currentLevel++;

  if (currentLevel < levels.length) {
    initializeBubbleGrid();
    // Additional logic or messages for level transition
  } else {
    // All levels completed, you can implement game completion logic here
    window.alert("Congratulations! You completed all levels!");
    window.location.reload();
  }
}

// get a random integer between the range of [min,max]
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// get the distance between two points
function getDistance(obj1, obj2) {
  const distX = obj1.x - obj2.x;
  const distY = obj1.y - obj2.y;
  return Math.sqrt(distX * distX + distY * distY);
}

// check for collision between two circles
function collides(obj1, obj2) {
  return getDistance(obj1, obj2) < obj1.radius + obj2.radius;
}

// find the closest bubbles that collide with the object
function getClosestBubble(obj, activeState = false) {
  const closestBubbles = bubbles.filter(
    (bubble) => bubble.active == activeState && collides(obj, bubble)
  );

  if (!closestBubbles.length) {
    return;
  }

  return (
    closestBubbles
      // turn the array of bubbles into an array of distances
      .map((bubble) => {
        return {
          distance: getDistance(obj, bubble),
          bubble,
        };
      })
      .sort((a, b) => a.distance - b.distance)[0].bubble
  );
}

// create the bubble grid bubble. passing a color will create
// an active bubble
function createBubble(x, y, color) {
  const row = Math.floor(y / grid);
  const col = Math.floor(x / grid);

  // bubbles on odd rows need to start half-way on the grid
  const startX = row % 2 === 0 ? 0 : 0.5 * grid;

  // because we are drawing circles we need the x/y position
  // to be the center of the circle instead of the top-left
  // corner like you would for a square
  const center = grid / 2;

  // Adjust the radius to make the bubbles larger
  const bubbleRadius = grid / 1.8;

  bubbles.push({
    x: wallSize + (grid + bubbleGap) * col + startX + center,

    // the bubbles are closer on the y axis so we subtract 4 on every
    // row
    y: wallSize + (grid + bubbleGap - 4) * row + center,

    radius: bubbleRadius,
    color: color,
    active: color ? true : false,
  });
}

// get all bubbles that touch the passed in bubble
function getNeighbors(bubble) {
  const neighbors = [];
  const dirs = [
    // right
    rotatePoint(grid, 0, 0),
    // up-right
    rotatePoint(grid, 0, degToRad(60)),
    // up-left
    rotatePoint(grid, 0, degToRad(120)),
    // left
    rotatePoint(grid, 0, degToRad(180)),
    // down-left
    rotatePoint(grid, 0, degToRad(240)),
    // down-right
    rotatePoint(grid, 0, degToRad(300)),
  ];

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];

    const newBubble = {
      x: bubble.x + dir.x,
      y: bubble.y + dir.y,
      radius: bubble.radius,
    };
    const neighbor = getClosestBubble(newBubble, true);
    if (neighbor && neighbor !== bubble && !neighbors.includes(neighbor)) {
      neighbors.push(neighbor);
    }
  }

  return neighbors;
}

// remove bubbles that create a match of 3 colors
function removeMatch(targetBubble) {
  const matches = [targetBubble];

  bubbles.forEach((bubble) => (bubble.processed = false));
  targetBubble.processed = true;

  // loop over the neighbors of matching colors for more matches
  let neighbors = getNeighbors(targetBubble);
  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i];

    if (!neighbor.processed) {
      neighbor.processed = true;

      if (neighbor.color === targetBubble.color) {
        matches.push(neighbor);
        neighbors = neighbors.concat(getNeighbors(neighbor));
      }
    }
  }

  if (matches.length >= 3) {
    matches.forEach((bubble) => {
      bubble.active = false;
    });
  }
}

// make any floating bubbles (bubbles that don't have a bubble chain
// that touch the ceiling) drop down the screen
function dropFloatingBubbles() {
  const activeBubbles = bubbles.filter((bubble) => bubble.active);
  activeBubbles.forEach((bubble) => (bubble.processed = false));

  // start at the bubbles that touch the ceiling
  let neighbors = activeBubbles.filter((bubble) => bubble.y - grid <= wallSize);

  // process all bubbles that form a chain with the ceiling bubbles
  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i];

    if (!neighbor.processed) {
      neighbor.processed = true;
      neighbors = neighbors.concat(getNeighbors(neighbor));
    }
  }

  // any bubble that is not processed doesn't touch the ceiling
  activeBubbles
    .filter((bubble) => !bubble.processed)
    .forEach((bubble) => {
      bubble.active = false;
      // create a particle bubble that falls down the screen
      particles.push({
        x: bubble.x,
        y: bubble.y,
        color: bubble.color,
        radius: bubble.radius,
        active: true,
      });
    });
}

// fill the grid with inactive bubbles
for (let row = 0; row < 10; row++) {
  for (let col = 0; col < (row % 2 === 0 ? 8 : 7); col++) {
    // if the level has a bubble at the location, create an active
    // bubble rather than an inactive one
    const color = level1[row]?.[col];
    createBubble(col * grid, row * grid, colorMap[color]);
  }
}

const curBubblePos = {
  // place the current bubble horizontally in the middle of the screen
  x: canvas.width / 2,
  y: canvas.height - grid * 1.5,
};
const curBubble = {
  x: curBubblePos.x,
  y: curBubblePos.y,
  color: "red",
  radius: grid / 2, // a circles radius is half the width (diameter)

  // how fast the bubble should go in either the x or y direction
  speed: 8,

  // bubble velocity
  dx: 0,
  dy: 0,
};

// angle (in radians) of the shooting arrow
let shootDeg = 0;

// min/max angle (in radians) of the shooting arrow
const minDeg = degToRad(-60);
const maxDeg = degToRad(60);

// the direction of movement for the arrow (-1 = left, 1 = right)
let shootDir = 0;

// reset the bubble to shoot to the bottom of the screen
function getNewBubble() {
  curBubble.x = curBubblePos.x;
  curBubble.y = curBubblePos.y;
  curBubble.dx = curBubble.dy = 0;

  const randInt = getRandomInt(0, colors.length - 1);
  curBubble.color = colors[randInt];
}

// handle collision between the current bubble and another bubble
function handleCollision(bubble) {
  bubble.color = curBubble.color;
  bubble.active = true;
  getNewBubble();
  removeMatch(bubble);
  dropFloatingBubbles();
}

// game loop
function loop() {
  requestAnimationFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // move the shooting arrow
  shootDeg = shootDeg + degToRad(2) * shootDir;

  // prevent shooting arrow from going below/above min/max
  if (shootDeg < minDeg) {
    shootDeg = minDeg;
  } else if (shootDeg > maxDeg) {
    shootDeg = maxDeg;
  }

  // move current bubble by it's velocity
  curBubble.x += curBubble.dx;
  curBubble.y += curBubble.dy;

  // prevent bubble from going through walls by changing its velocity
  if (curBubble.x - grid / 2 < wallSize) {
    curBubble.x = wallSize + grid / 2;
    curBubble.dx *= -1;
  } else if (curBubble.x + grid / 2 > canvas.width - wallSize) {
    curBubble.x = canvas.width - wallSize - grid / 2;
    curBubble.dx *= -1;
  }

  // check to see if bubble collides with the top wall
  if (curBubble.y - grid / 2 < wallSize) {
    // make the closest inactive bubble active
    const closestBubble = getClosestBubble(curBubble);
    handleCollision(closestBubble);
  }

  // check to see if bubble collides with another bubble
  for (let i = 0; i < bubbles.length; i++) {
    const bubble = bubbles[i];

    if (bubble.active && collides(curBubble, bubble)) {
      const closestBubble = getClosestBubble(curBubble);
      if (!closestBubble) {
        window.alert("Game Over");
      }

      if (closestBubble) {
        handleCollision(closestBubble);
      }
    }
    const allBubblesCleared = bubbles.every((bubble) => !bubble.active);
    if (allBubblesCleared) {
      nextLevel();
      return; // Skip the rest of the loop when the level is completed
    }
    //   Draw "Level Completed" message when all bubbles are empty
    if (currentLevel >= levels.length) {
      context.fillStyle = "white";
      context.font = "30px Arial";
      context.textAlign = "center";
      context.fillText("Level Completed", canvas.width / 2, canvas.height / 2);
    }
  }

  // move bubble particles
  particles.forEach((particle) => {
    particle.y += 8;
  });

  // remove particles that went off the screen
  particles = particles.filter(
    (particles) => particles.y < canvas.height - grid / 2
  );

  // draw walls
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, canvas.width, wallSize);
  context.fillRect(0, 0, wallSize, canvas.height);
  context.fillRect(canvas.width - wallSize, 0, wallSize, canvas.height);

  // draw bubbles and particles
  bubbles.concat(particles).forEach((bubble) => {
    if (!bubble.active) return;
    context.fillStyle = bubble.color;

    // draw a circle
    context.beginPath();
    context.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
    context.fill();
  });

  // draw fire arrow. since we're rotating the canvas we need to save
  // the state and restore it when we're done
  context.save();

  // move to the center of the rotation (the middle of the bubble)
  context.translate(curBubblePos.x, curBubblePos.y);
  context.rotate(shootDeg);

  // move to the top-left corner of or fire arrow
  context.translate(0, (-grid / 2) * 4.5);

  // draw arrow ↑
  context.strokeStyle = "white";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(0, grid * 2);
  context.moveTo(0, 0);
  context.lineTo(-10, grid * 0.4);
  context.moveTo(0, 0);
  context.lineTo(10, grid * 0.4);
  context.stroke();

  context.restore();

  // draw current bubble
  context.fillStyle = curBubble.color;
  context.beginPath();
  context.arc(curBubble.x, curBubble.y, curBubble.radius, 0, 2 * Math.PI);
  context.fill();

  // Check if all active bubbles are cleared for the current level
  if (bubbles.every((bubble) => !bubble.active)) {
    nextLevel();
  }
}

// listen for keyboard events to move the fire arrow
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowLeft") {
    shootDir = -1;
  } else if (e.code === "ArrowRight") {
    shootDir = 1;
  }

  // if the current bubble is not moving we can launch it
  if (e.code === "Space" && curBubble.dx === 0 && curBubble.dy === 0) {
    // convert an angle to x/y
    curBubble.dx = Math.sin(shootDeg) * curBubble.speed;
    curBubble.dy = -Math.cos(shootDeg) * curBubble.speed;
  }
});

document.addEventListener("keyup", (e) => {
  if (
    (e.code === "ArrowLeft" && shootDir === -1) ||
    (e.code === "ArrowRight" && shootDir === 1)
  ) {
    shootDir = 0;
  }
});

// start the game
requestAnimationFrame(loop);
