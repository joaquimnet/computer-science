export class DynamicStack<T> {
  #items = new Array<T>();
  constructor() {
    this.#items = new Array();
  }

  push(item: T) {
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

  isEmpty() {
    return this.#items.length === 0;
  }
}
