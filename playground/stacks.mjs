import { DynamicStack } from '../data_structures/stack/dynamic-stack.mjs';
import { FixedStack } from '../data_structures/stack/fixed-stack.mjs';

const fixed = new FixedStack(3);

console.log('Fixed Stack: ', fixed);

fixed.push('Hi');
fixed.push('Hello');
fixed.push('Greetings');

console.log('fixed.isEmpty(): ', fixed.isEmpty());
console.log('fixed.isFull(): ', fixed.isFull());
console.log('fixed.peek(): ', fixed.peek());
console.log('fixed.pop(): ', fixed.pop());
console.log('fixed.pop(): ', fixed.pop());
console.log('fixed.pop(): ', fixed.pop());
console.log('fixed.isEmpty(): ', fixed.isEmpty());
console.log('fixed.isFull(): ', fixed.isFull());

console.log('-----------------------');

const dynamic = new DynamicStack();

console.log('Dynamic Stack: ', dynamic);

dynamic.push('Hi');
dynamic.push('Hello');
dynamic.push('Greetings');

console.log('dynamic.isEmpty(): ', dynamic.isEmpty());
console.log('dynamic.peek(): ', dynamic.peek());
console.log('dynamic.pop(): ', dynamic.pop());
console.log('dynamic.pop(): ', dynamic.pop());
console.log('dynamic.pop(): ', dynamic.pop());
console.log('dynamic.isEmpty(): ', dynamic.isEmpty());
