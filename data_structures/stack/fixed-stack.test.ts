import {
  assertEquals,
  assert,
  assertThrows,
} from 'https://deno.land/std@0.86.0/testing/asserts.ts';

import { FixedStack } from './fixed-stack.ts';

Deno.test('Fixed Stack -> can instantiate', () => {
  const stack = new FixedStack(1);
  assert(stack instanceof FixedStack);
});

Deno.test('Fixed Stack -> invalid stack size should throw', () => {
  let thisShouldThrow;
  thisShouldThrow = () => new FixedStack(-1);
  assertThrows(thisShouldThrow);
  thisShouldThrow = () => new FixedStack(0);
  assertThrows(thisShouldThrow);
});

Deno.test('Fixed Stack -> can check if empty', () => {
  const stack = new FixedStack(1);
  assertEquals(stack.isEmpty(), true);
  stack.push('hello');
  assertEquals(stack.isEmpty(), false);
});

Deno.test('Fixed Stack -> can check if full', () => {
  const stack = new FixedStack(1);
  assertEquals(stack.isFull(), false);
  stack.push('hello');
  assertEquals(stack.isFull(), true);
});

Deno.test('Fixed Stack -> can push items', () => {
  const stack = new FixedStack(3);
  assertEquals(stack.size, 0);
  stack.push('hello');
  assertEquals(stack.peek(), 'hello');
  assertEquals(stack.size, 1);
});

Deno.test('Fixed Stack -> pushing a full stack throws', () => {
  const stack = new FixedStack(1);
  stack.push('hello');
  const thisShouldThrow = () => stack.push('not allowed');
  assertThrows(thisShouldThrow);
});

Deno.test('Fixed Stack -> can pop items', () => {
  const stack = new FixedStack(2);
  stack.push('hello');
  stack.push('world');
  assertEquals(stack.size, 2);
  stack.pop();
  assertEquals(stack.size, 1);
  stack.pop();
  assertEquals(stack.size, 0);
});

Deno.test('Fixed Stack -> pop returns undefined if empty', () => {
  const stack = new FixedStack(1);
  stack.push('hello');
  assertEquals(stack.pop(), 'hello');
  assertEquals(stack.pop(), undefined);
});

Deno.test('Fixed Stack -> peek returns undefined if empty', () => {
  const stack = new FixedStack(1);
  assertEquals(stack.peek(), undefined);
});

Deno.test('Fixed Stack -> first in, last out', () => {
  const stack = new FixedStack(2);
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
