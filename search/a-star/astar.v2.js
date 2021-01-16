const PriorityQueue = require('priorityqueuejs');

class Algorithm {
  H(a, b) {
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
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        grid.set(row + ' ' + col, new Point(x, y));
      }
    }
    return grid;
  }

  static infinity(size) {
    const grid = new Map();
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        grid.set(row + ' ' + col, Infinity);
      }
    }
    return grid;
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
