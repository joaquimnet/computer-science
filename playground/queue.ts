import { Queue } from '../data_structures/queue/queue.ts';

const queue = new Queue<string>();

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
