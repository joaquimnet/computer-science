export class DynamicStack {
  #items = new Array();
  constructor() {
    this.#items = new Array();
  }

  push(item) {
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

  isEmpty() {
    return this.#items.length === 0;
  }
}
