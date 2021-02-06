class Queue {
  #items = new Array();

  constructor() {
    this.#items = new Array();
  }

  enqueue(item) {
    this.#items.push(item);
  }

  dequeue() {
    return this.#items.shift();
  }

  peek() {
    return this.#items[0];
  }

  isEmpty() {
    return this.#items.length === 0;
  }
}

module.exports = Queue;
