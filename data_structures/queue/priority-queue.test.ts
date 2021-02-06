import { assertEquals, assert } from 'https://deno.land/std@0.86.0/testing/asserts.ts';

import { PriorityQueue } from './priority-queue.ts';

const orderSimple = (a: any, b: any) => a[1] < b[1];
const orderReverse = (a: any, b: any) => a[1] > b[1];

// Simple name and function, compact form, but not configurable
Deno.test('PriorityQueue -> can instantiate', () => {
  const queue = new PriorityQueue(orderSimple);
  assert(queue instanceof PriorityQueue);
});

Deno.test('PriorityQueue -> can peek front', () => {
  const queue = new PriorityQueue(orderSimple);
  queue.enqueue(['hello', 1]);
  assertEquals(queue.peek()[0], 'hello');
});

Deno.test('PriorityQueue -> can check if empty', () => {
  const queue = new PriorityQueue(orderSimple);
  assertEquals(queue.isEmpty(), true);
});

Deno.test('PriorityQueue -> can verify size', () => {
  const queue = new PriorityQueue(orderSimple);
  queue.enqueue(['hello', 1]);
  assertEquals(queue.size, 1);
});

Deno.test('PriorityQueue -> can enqueue items', () => {
  const queue = new PriorityQueue(orderSimple);
  queue.enqueue(['hello', 1]);
  assertEquals(queue.size, 1);
});

Deno.test('PriorityQueue -> can dequeue items', () => {
  const queue = new PriorityQueue(orderSimple);
  queue.enqueue(['hello', 1]);
  assertEquals(queue.size, 1);
  queue.dequeue();
  assertEquals(queue.size, 0);
});

Deno.test('PriorityQueue -> can enqueue based on priority', () => {
  const queue = new PriorityQueue(orderSimple);
  queue.enqueue(['black', 3]);
  queue.enqueue(['white', 1]);
  queue.enqueue(['gray', 2]);

  assertEquals(queue.dequeue()![0], 'white');
  assertEquals(queue.dequeue()![0], 'gray');
  assertEquals(queue.dequeue()![0], 'black');
});

Deno.test('PriorityQueue -> can dequeue', () => {
  const queue = new PriorityQueue(orderSimple);
  queue.enqueue(['hello', 1]);
  queue.enqueue(['world', 2]);
  assertEquals(queue.size, 2);
  assertEquals(queue.peek()[0], 'hello');
  assertEquals(queue.dequeue()![0], 'hello');
  assertEquals(queue.size, 1);
  assertEquals(queue.peek()[0], 'world');
  assertEquals(queue.dequeue()![0], 'world');
  assertEquals(queue.size, 0);
});
