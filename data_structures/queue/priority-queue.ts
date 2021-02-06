type PriorityItem<T> = [T, number];
type CompareFunction<T> = (a: PriorityItem<T>, b: PriorityItem<T>) => boolean;

export class PriorityQueue<T> {
  #items = new Array<PriorityItem<T>>();
  #compareFn: CompareFunction<T>;

  constructor(compareFn: CompareFunction<T>) {
    this.#items = new Array();
    this.#compareFn = compareFn;
  }

  enqueue(newItem: PriorityItem<T>) {
    if (this.isEmpty()) {
      this.#items.push(newItem);
      return;
    }

    let added = false;

    for (const [i, item] of this.#items.entries()) {
      if (this.#compareFn(newItem, item)) {
        this.#items.splice(i, 0, newItem);
        added = true;
        break;
      }
    }

    if (!added) this.#items.push(newItem);
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
