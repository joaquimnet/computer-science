// A* Algorithm, V2.
//
// Joaquim Neto
// January 17, 2021.

const PriorityQueue = require('priorityqueuejs');

const GRID_SIZE = 32;
const START = [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
const END = [Math.floor(Math.random() * GRID_SIZE), Math.floor(Math.random() * GRID_SIZE)];
const STEP_TIME = 20;
const ADD_RANDOM_BARRIERS = true;
const RANDOM_BARRIERS_CHANCE = 0.35;

class Algorithm {
  static async run() {
    const [grid, fScores, gScores] = Gridder.create(GRID_SIZE);

    const START_POINT = new Point(...START);
    const END_POINT = new Point(...END);

    grid.get(START_POINT.key).makeStart();
    grid.get(END_POINT.key).makeEnd();

    let count = 0;

    // this will keep track of which node came from where at the end of the computation
    const cameFrom = new Map();

    // this priority queue will order stuff by their fScore, count
    const openNodes = new PriorityQueue((a, b) => b[0] - a[0]);
    openNodes.enq([0, count, grid.get(Gridder.key(...START))]);

    // keeps track of which nodes are in the queue
    const nodesInQueue = new Set([START_POINT.key]);

    // gScore keeps track of how much it costs to get from start to current node
    gScores.set(START_POINT.key, 0);
    // fScore keeps track of the predicted distance from the current node to the end
    fScores.set(START_POINT.key, this.H(START_POINT, END_POINT));

    while (!openNodes.isEmpty()) {
      await Gridder.wait(STEP_TIME);
      Gridder.display(grid);

      const current = openNodes.deq()[2];
      nodesInQueue.delete(current.key);

      if (
        current.key === END_POINT.key ||
        grid
          .get(END_POINT.key)
          .neighbors.map((n) => n.key)
          .includes(current.key)
      ) {
        Gridder.resetGrid(grid);
        const bestPath = [];

        let currentlyDrawing = current;
        while (currentlyDrawing) {
          bestPath.push(currentlyDrawing);
          currentlyDrawing = cameFrom.get(currentlyDrawing.key);
        }

        bestPath.reverse();
        for (const point of bestPath) {
          point.status = '=';
          await Gridder.wait(70);
          grid.get(START_POINT.key).makeStart();
          grid.get(END_POINT.key).makeEnd();
          Gridder.display(grid);
        }
        console.log('Done!');
        return true;
      }

      for (const neighbor of current.neighbors) {
        const tempGScore = gScores.get(current.key) + 1;
        if (tempGScore < gScores.get(neighbor.key)) {
          cameFrom.set(neighbor.key, current);
          gScores.set(neighbor.key, tempGScore);
          fScores.set(neighbor.key, tempGScore + this.H(neighbor, END_POINT));
          if (!nodesInQueue.has(neighbor.key)) {
            count += 1;
            openNodes.enq([fScores.get(neighbor.key), count, neighbor]);
            nodesInQueue.add(neighbor.key);
            neighbor.makeClosed();
          }
        }
      }

      if (current.key != START_POINT.key) {
        current.makeClosed();
      }
    }
    console.log('No path, very sad :(');
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
    EMPTY: ' ',
    OPEN: 'o',
    CLOSED: 'c',
    BARRIER: '.',
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
    if (ADD_RANDOM_BARRIERS) {
      Gridder.addRandomBarriers(grid, 0.8);
    }
    Gridder.updateNeighbors(grid);
    return [grid, fScores, gSCores];
  }

  static addRandomBarriers(grid, chance) {
    for (const point of grid.values()) {
      if (Math.random() < RANDOM_BARRIERS_CHANCE) {
        point.makeBarrier();
      }
    }
  }

  static resetGrid(grid) {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        const point = grid.get(row + ' ' + col);
        if (
          ![Point.statuses.START, Point.statuses.END, Point.statuses.BARRIER].includes(point.status)
        ) {
          point.status = Point.statuses.EMPTY;
        }
      }
    }
  }

  static updateNeighbors(grid) {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
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

  static display(grid) {
    const rows = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      rows[row] = [];
      for (let col = 0; col < GRID_SIZE; col++) {
        rows[row][col] = grid.get(Gridder.key(row, col)).status;
      }
    }
    console.log(
      '\n\n\n\n\n\n\n',
      '\n' + rows.map((row) => '| ' + row.join(' | ') + ' |').join('\n'),
    );
  }

  static wait(m) {
    return new Promise((r) => setTimeout(r, m));
  }
}

(() => {
  Algorithm.run();
})();
