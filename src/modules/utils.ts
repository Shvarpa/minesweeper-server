export function randomInt(range: number): number {
  return Math.floor(Math.random() * range);
}

export function* zip(a: any[], b: any[]) {
  for (let key in a) yield [a[key], b[key]];
}

export function* genFilter<T>(
  gen: IterableIterator<T>,
  filter: (item: T) => boolean
) {
  for (let item of gen) if (filter(item)) yield item;
}

export function* genMap<T, N>(
  gen: IterableIterator<T>,
  mapper: (item: T) => N
) {
  for (let item of gen) yield mapper(item);
}

export function* cross(a: any[], b: any[]) {
  for (let x of a) for (let y of b) yield [x, y];
}

export function range(start: number, stop?: number, step?: number): number[] {
  if (!stop) {
    stop = start;
    start = 0;
  }
  step = typeof step == 'undefined'? 1: step

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

export function objectDeepEqual(x: any, y: any): boolean {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every(key => objectDeepEqual(x[key], y[key]))
    : x === y;
}

export function popRandom(array: any[]): any {
  return array.splice(randomInt(array.length), 1);
}
