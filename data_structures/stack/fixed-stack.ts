export class FixedStack<T> {
  #items = new Array<T>();
  size: number;

  constructor(size: number) {
    const stackSize = Math.floor(Number(size));
    if (!stackSize || Number.isNaN(stackSize) || stackSize === 0) {
      throw new Error('You must provide a valid stack size');
    }
    this.#items = new Array();
    this.size = size;
  }

  push(item: T) {
    if (this.isFull()) {
      throw new RangeError('Index out of bounds');
    }
    this.#items.push(item);
  }

  pop() {
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
    return this.#items.length === this.size;
  }

  isEmpty() {
    return this.#items.length === 0;
  }
}
