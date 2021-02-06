export function binarySearch(arr: number[], item: number) {
  const { floor, abs, min } = Math;

  if (arr.length === 0) return undefined;

  const mid = (a: number, b: number) => floor(abs(a - b) / 2) + min(a, b);
  let bottom = 0;
  let top = arr.length - 1;
  let head = mid(top, bottom);

  while (true) {
    if (top - bottom === 0) return undefined;

    const middle = mid(top, bottom);
    if (arr[middle] > item) {
      top = middle;
    } else if (arr[middle] < item) {
      bottom = middle;
    }
    head = mid(top, bottom);
    if (arr[head] === item) return arr[head];
  }
}
