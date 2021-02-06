import { Queue } from '../data_structures/queue/queue.js';

const queue = new Queue();

queue.enqueue('One');
queue.enqueue('Two');
queue.enqueue('Three');
queue.enqueue('Four');
queue.enqueue('Five');

console.log('Peek:', queue.peek());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
console.log('Dequeue', queue.dequeue());
