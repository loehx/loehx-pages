export function memoize(fn: Function) {
  const cache = {} as Record<string, any>;

  return async function () {
    const args = JSON.stringify(arguments);
    cache[args] = cache[args] || fn.apply(undefined, arguments);
    return cache[args];
  };
}
