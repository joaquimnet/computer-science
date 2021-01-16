const PriorityQueue = require('priorityqueuejs');

const GRID_SIZE = 16;
const START = [0, 0];
const END = [GRID_SIZE - 1, GRID_SIZE - 1];

class Algorithm {
  static run() {
    const [grid, fScores, gScores] = Gridder.create(GRID_SIZE);
    grid.get(Gridder.key(...START)).makeStart();
    grid.get(Gridder.key(...END)).makeEnd();
  }

  static H(a, b) {
    // Manhattan distance
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.neighbors = [];
    this.status = Point.statuses.EMPTY;
  }

  get key() {
    return this.x + ' ' + this.y;
  }

  get isClosed() {
    return this.status === Point.statuses.CLOSED;
  }
  get isOpen() {
    return this.status === Point.statuses.OPEN;
  }
  get isBarrier() {
    return this.status === Point.statuses.BARRIER;
  }
  get isStart() {
    return this.status === Point.statuses.START;
  }
  get isEnd() {
    return this.status === Point.statuses.END;
  }

  makeClosed() {
    this.status = Point.statuses.CLOSED;
  }
  makeOpen() {
    this.status = Point.statuses.OPEN;
  }
  makeBarrier() {
    this.status = Point.statuses.BARRIER;
  }
  makeStart() {
    this.status = Point.statuses.START;
  }
  makeEnd() {
    this.status = Point.statuses.END;
  }

  static statuses = {
    EMPTY: '.',
    OPEN: 'o',
    CLOSED: 'c',
    BARRIER: 'x',
    START: 's',
    END: 'g',
  };
}

class Gridder {
  static key(x, y) {
    return x + ' ' + y;
  }

  static create(size) {
    const grid = new Map();
    const fScores = new Map();
    const gSCores = new Map();

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        grid.set(row + ' ' + col, new Point(row, col));
        fScores.set(row + ' ' + col, Infinity);
        gSCores.set(row + ' ' + col, Infinity);
      }
    }
    Gridder.updateNeighbors(grid);
    return [grid, fScores, gSCores];
  }

  static updateNeighbors(grid) {
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        // down
        if (row < GRID_SIZE - 1 && !grid.get(Gridder.key(row + 1, col)).isBarrier) {
          grid.get(Gridder.key(row, col)).neighbors.push(grid.get(Gridder.key(row + 1, col)));
        }
        // up
        if (row > 0 && !grid.get(Gridder.key(row - 1, col)).isBarrier) {
          grid.get(Gridder.key(row, col)).neighbors.push(grid.get(Gridder.key(row - 1, col)));
        }
        // right
        if (col < GRID_SIZE - 1 && !grid.get(Gridder.key(row, col + 1)).isBarrier) {
          grid.get(Gridder.key(row, col)).neighbors.push(grid.get(Gridder.key(row, col + 1)));
        }
        // left
        if (col > 0 && !grid.get(Gridder.key(row, col - 1)).isBarrier) {
          grid.get(Gridder.key(row, col)).neighbors.push(grid.get(Gridder.key(row, col - 1)));
        }
      }
    }
  }

  // static display(grid) {
  //   const whiteSpace = '\n\n\n\n\n\n\n';
  //   const rows = [];
  //   console.log(
  //     '\n\n\n\n\n\n\n',
  //     '\n' + grid.map((row) => '| ' + row.map((y) => y.status).join(' | ') + ' |').join('\n'),
  //   );
  //   for (let row = 0; row < size; row++) {
  //     for (let col = 0; col < size; col++) {
  //       rows.push(grid.get(Gridder.key(x, y)).status);
  //     }
  //   }
  // }
}
