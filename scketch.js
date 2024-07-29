let maze = [];
let playerX = 0;
let playerY = 0;
let gridSize = 20;
let stack = [];

function setup() {
  createCanvas(400, 400);
  background(220);
  generateMaze();
}

function draw() {
  background(220);
  drawMaze();
  drawPlayer();
}

function generateMaze() {
  for (let i = 0; i < gridSize; i++) {
    maze[i] = [];
    for (let j = 0; j < gridSize; j++) {
      maze[i][j] = Math.random() < 0.5 ? 0 : 1; // 0 = empty, 1 = wall
    }
  }
  recursiveBacktrackingMaze(1, 1);
  maze[playerX][playerY] = 0; // set player's starting position to empty
}

function recursiveBacktrackingMaze(x, y) {
  let directions = [
    [0, -1], // up
    [0, 1], // down
    [-1, 0], // left
    [1, 0] // right
  ];
  let randomIndex = Math.floor(Math.random() * directions.length);
  let direction = directions[randomIndex];
  let newX = x + direction[0] * 2;
  let newY = y + direction[1] * 2;

  if (
    newX >= 0 &&
    newX < gridSize &&
    newY >= 0 &&
    newY < gridSize &&
    maze[newX][newY] === 1
  ) {
    maze[x + direction[0]][y + direction[1]] = 0;
    maze[newX][newY] = 0;
    stack.push([x, y]);
    recursiveBacktrackingMaze(newX, newY);
  } else {
    if (stack.length > 0) {
      let previous = stack.pop();
      recursiveBacktrackingMaze(previous[0], previous[1]);
    }
  }
}

function drawMaze() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (maze[i][j] === 1) {
        fill(0); // black for walls
        rect(i * 20, j * 20, 20, 20);
      }
    }
  }
}

function drawPlayer() {
  fill(255, 0, 0); // red for player
  rect(playerX * 20, playerY * 20, 20, 20);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (playerY > 0 && maze[playerX][playerY - 1] === 0) {
      playerY--;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (playerY < gridSize - 1 && maze[playerX][playerY + 1] === 0) {
      playerY++;
    }
  } else if (keyCode === LEFT_ARROW) {
    if (playerX > 0 && maze[playerX - 1][playerY] === 0) {
      playerX--;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (playerX < gridSize - 1 && maze[playerX + 1][playerY] === 0) {
      playerX++;
    }
  }
}