import { assertEquals, assert } from 'https://deno.land/std@0.86.0/testing/asserts.ts';

import { Queue } from './queue.ts';

// Simple name and function, compact form, but not configurable
Deno.test('Queue -> can instantiate', () => {
  const queue = new Queue();
  assert(queue instanceof Queue);
});

Deno.test('Queue -> can peek front', () => {
  const queue = new Queue();
  queue.enqueue('hello');
  assertEquals(queue.peek(), 'hello');
});

Deno.test('Queue -> can check if empty', () => {
  const queue = new Queue();
  assertEquals(queue.isEmpty(), true);
});

Deno.test('Queue -> can verify size', () => {
  const queue = new Queue();
  queue.enqueue('hello');
  assertEquals(queue.size, 1);
});

Deno.test('Queue -> can enqueue items', () => {
  const queue = new Queue();
  queue.enqueue('hello');
  assertEquals(queue.size, 1);
});

Deno.test('Queue -> can dequeue items', () => {
  const queue = new Queue();
  queue.enqueue('hello');
  assertEquals(queue.size, 1);
  queue.dequeue();
  assertEquals(queue.size, 0);
});

Deno.test('Queue -> first in, first out', () => {
  const queue = new Queue();
  queue.enqueue('hello');
  queue.enqueue('world');
  assertEquals(queue.size, 2);
  assertEquals(queue.peek(), 'hello');
  assertEquals(queue.dequeue(), 'hello');
  assertEquals(queue.size, 1);
  assertEquals(queue.peek(), 'world');
  assertEquals(queue.dequeue(), 'world');
  assertEquals(queue.size, 0);
});
