export class Queue<T> {
  #items = new Array<T>();

  constructor() {
    this.#items = new Array();
  }

  enqueue(item: T) {
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

  get size() {
    return this.#items.length;
  }
}
