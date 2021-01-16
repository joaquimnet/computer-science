const PriorityQueue = require('priorityqueuejs');
// A* search algorithm

const GRID_SIZE = 16;

async function run() {
  const grid = getNewGrid();
  const START = [0, 0];
  const END = [GRID_SIZE - 1, GRID_SIZE - 1];

  addRandomBarriers(grid, 0.15);
  makeStart(START[0], START[1], grid);
  makeEnd(END[0], END[1], grid);
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      updateNeighbors(x, y, grid);
    }
  }

  let count = 0;
  const openSet = new PriorityQueue((a, b) => b[0] - a[0]);
  openSet.enq([0, count, grid[START[0]][START[1]]]);
  const cameFrom = {};
  let gScore = getNewInfinityGrid();
  gScore[START[0]][START[1]] = 0;
  let fScore = getNewInfinityGrid();
  fScore[START[0]][START[1]] = H(grid[START[0]][START[1]], grid[END[0]][END[1]]);

  const startPoint = grid[START[0]][START[1]];
  const openSetHash = { [startPoint.x + ' ' + startPoint.y]: true };

  while (!openSet.isEmpty()) {
    // await wait(5);
    displayGrid(grid);
    const current = openSet.deq()[2];
    openSetHash[current.x + ' ' + current.y] = 0;

    if (JSON.stringify([current.x, current.y]) === JSON.stringify(END)) {
      const mano = Object.entries(cameFrom);
      mano.sort((a, b) => H(b[1], START) - H(a[1], START));
      const happiestPath = [];
      let spot = mano[mano.length - 1];
      while (JSON.stringify([spot[1].x, spot[1].y]) !== JSON.stringify(START)) {
        spot = mano.find((p) => p[0] === spot[1].x + ' ' + spot[1].y);
        happiestPath.push(spot[1]);
      }

      resetGrid(grid);
      happiestPath.forEach((p) => makePog(p, grid));
      // Object.values(cameFrom).forEach((p) => makePog(p, grid));
      displayGrid(grid);
      // console.log('cameFrom: ', cameFrom);
      console.log('Done!');
      return;
    }

    // console.log('boop1');
    for (const neighbor of current.neighbors) {
      let tempGScore = gScore[current.x][current.y] + 1;
      if (tempGScore < gScore[neighbor.x][neighbor.y]) {
        // console.log('boop2');
        cameFrom[neighbor.x + ' ' + neighbor.y] = current;
        gScore[neighbor.x][neighbor.y] = tempGScore;
        fScore[neighbor.x][neighbor.y] = tempGScore + H(neighbor, grid[END[0]][END[1]]);
        if (!openSetHash[neighbor.x + ' ' + neighbor.y]) {
          // console.log('openSetHash', Object.keys(openSetHash));
          count += 1;
          openSet.enq([fScore[neighbor.x][neighbor.y], count, neighbor]);
          openSetHash[neighbor.x + ' ' + neighbor.y] = true;
          makeOpen(neighbor.x, neighbor.y, grid);
        }
      }
    }

    if (JSON.stringify([current.x, current.y]) !== JSON.stringify(START)) {
      makeClosed(current.x, current.y, grid);
    }
  }
  console.log('No path, very sad :(');
}

var H = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

var isClosed = (x, y, grid) => grid[x][y].status === 'c';
var isOpen = (x, y, grid) => grid[x][y].status === 'o';
var isBarrier = (x, y, grid) => grid[x][y].status === 'x';
var isStart = (x, y, grid) => grid[x][y].status === 's';
var isEnd = (x, y, grid) => grid[x][y].status === 'g';

var makeClosed = (x, y, grid) => (grid[x][y].status = 'c');
var makeOpen = (x, y, grid) => (grid[x][y].status = 'o');
var makeBarrier = (x, y, grid) => (grid[x][y].status = 'x');
var makeStart = (x, y, grid) => (grid[x][y].status = 's');
var makeEnd = (x, y, grid) => (grid[x][y].status = 'g');
var makePog = (point, grid) => (grid[point.x][point.y].status = 'O');

var reset = (x, y, grid) => (grid[x][y].status = '.');
var resetGrid = (grid) => {
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      // if (isBarrier(x, y, grid)) continue;
      reset(x, y, grid);
    }
  }
};

function updateNeighbors(row, col, grid) {
  // down
  if (row < GRID_SIZE - 1 && !isBarrier(row + 1, col, grid)) {
    grid[row][col].neighbors.push(grid[row + 1][col]);
  }
  // up
  if (row > 0 && !isBarrier(row - 1, col, grid)) {
    grid[row][col].neighbors.push(grid[row - 1][col]);
  }
  // right
  if (col < GRID_SIZE - 1 && !isBarrier(row, col + 1, grid)) {
    grid[row][col].neighbors.push(grid[row][col + 1]);
  }
  // left
  if (col > 0 && !isBarrier(row, col - 1, grid)) {
    grid[row][col].neighbors.push(grid[row][col - 1]);
  }
}

async function wait(m) {
  return new Promise((r) => setTimeout(r, m));
}

function displayGrid(grid) {
  console.log(
    '\n\n\n\n\n\n\n',
    '\n' + grid.map((row) => '| ' + row.map((y) => y.status).join(' | ') + ' |').join('\n'),
  );
}

function getNewGrid() {
  const grid = new Array(GRID_SIZE);
  for (let x = 0; x < GRID_SIZE; x++) {
    grid[x] = new Array(GRID_SIZE);
    for (let y = 0; y < GRID_SIZE; y++) {
      grid[x][y] = { neighbors: [], status: '.', x, y };
    }
  }
  return grid;
}

function getNewInfinityGrid() {
  const grid = new Array(GRID_SIZE);
  for (let x = 0; x < GRID_SIZE; x++) {
    grid[x] = new Array(GRID_SIZE);
    for (let y = 0; y < GRID_SIZE; y++) {
      grid[x][y] = Infinity;
    }
  }
  return grid;
}

function addRandomBarriers(grid, rarity) {
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (Math.random() < rarity) {
        makeBarrier(x, y, grid);
      }
    }
  }
}

run();
