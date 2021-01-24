export class DynamicStack {
  constructor() {
    this._items = new Array();
  }

  push(item) {
    this._items.push(item);
  }

  pop(item) {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this._items[this._items.length - 1];
  }

  isEmpty() {
    return this._items.length === 0;
  }
}
