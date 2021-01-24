export class FixedStack {
  constructor(size) {
    this._items = new Array();
    this._size = size;
  }

  push(item) {
    if (this.isFull()) {
      throw new RangeError('Index out of bounds');
    }
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

  isFull() {
    return this._items.length === size;
  }

  isEmpty() {
    return this._items.length === 0;
  }
}
