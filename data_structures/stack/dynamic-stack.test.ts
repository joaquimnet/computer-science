import {
  assertEquals,
  assert,
  assertThrows,
} from 'https://deno.land/std@0.86.0/testing/asserts.ts';

import { DynamicStack } from './dynamic-stack.ts';

Deno.test('Dynamic Stack -> can instantiate', () => {
  const stack = new DynamicStack();
  assert(stack instanceof DynamicStack);
});

Deno.test('Dynamic Stack -> can check if empty', () => {
  const stack = new DynamicStack();
  assertEquals(stack.isEmpty(), true);
  stack.push('hello');
  assertEquals(stack.isEmpty(), false);
});

Deno.test('Dynamic Stack -> can push items', () => {
  const stack = new DynamicStack();
  assertEquals(stack.size, 0);
  stack.push('hello');
  assertEquals(stack.peek(), 'hello');
  assertEquals(stack.size, 1);
});

Deno.test('Dynamic Stack -> can pop items', () => {
  const stack = new DynamicStack();
  stack.push('hello');
  stack.push('world');
  assertEquals(stack.size, 2);
  stack.pop();
  assertEquals(stack.size, 1);
  stack.pop();
  assertEquals(stack.size, 0);
});

Deno.test('Dynamic Stack -> pop returns undefined if empty', () => {
  const stack = new DynamicStack();
  stack.push('hello');
  assertEquals(stack.pop(), 'hello');
  assertEquals(stack.pop(), undefined);
});

Deno.test('Dynamic Stack -> peek returns undefined if empty', () => {
  const stack = new DynamicStack();
  assertEquals(stack.peek(), undefined);
});

Deno.test('Dynamic Stack -> first in, last out', () => {
  const stack = new DynamicStack();
  stack.push('hello');
  stack.push('world');
  assertEquals(stack.size, 2);
  assertEquals(stack.peek(), 'world');
  assertEquals(stack.pop(), 'world');
  assertEquals(stack.size, 1);
  assertEquals(stack.peek(), 'hello');
  assertEquals(stack.pop(), 'hello');
  assertEquals(stack.size, 0);
});
