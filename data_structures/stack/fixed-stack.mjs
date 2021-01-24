export class FixedStack {
  #items = new Array();

  constructor(size) {
    const stackSize = Math.floor(Number(size));
    if (!stackSize || Number.isNaN(stackSize) || stackSize === 0) {
      throw new ValueError('You must provide a valid stack size');
    }
    this.#items = new Array();
    this.size = size;
  }

  push(item) {
    if (this.isFull()) {
      throw new RangeError('Index out of bounds');
    }
    this.#items.push(item);
  }

  pop(item) {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#items.length - 1];
  }

  isFull() {
    return this.#items.length === size;
  }

  isEmpty() {
    return this.#items.length === 0;
  }
}
