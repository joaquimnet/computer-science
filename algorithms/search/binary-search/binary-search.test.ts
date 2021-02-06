import { assertEquals, assert } from 'https://deno.land/std@0.86.0/testing/asserts.ts';
import Random from 'https://deno.land/x/random@v1.1.2/Random.js';

import { binarySearch } from './binary-search.ts';

const range = (length: number) => new Array(length).fill(1).map((_, i) => i + 1);
const r = new Random();

Deno.test('Binary Search -> can find the number if target > middle', () => {
  assertEquals(binarySearch(range(10), 7), 7);
  assertEquals(binarySearch(range(100), 70), 70);
  // assertEquals(binarySearch(range(100), 51), 51);
});

Deno.test('Binary Search -> can find the number if target < middle', () => {
  const arr = range(10);
  assertEquals(binarySearch(arr, 3), 3);
});

Deno.test('Binary Search -> can find the number if target === middle', () => {
  const arr = range(10);
  assertEquals(binarySearch(arr, 5), 5);
});

Deno.test(`Binary Search -> can find the number in an array of random size`, () => {
  for (let i = 0; i < 1000; i++) {
    const size = r.int(1, 100) * i;
    const target = r.int(1, size);
    const arr = range(size);
    assertEquals(binarySearch(arr, target), target || undefined);
  }
});
