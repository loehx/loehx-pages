import { onServerPrefetch, useContext } from "@nuxtjs/composition-api";

export function memoize(fn: Function) {
  const cache = {} as Record<string, any>;

  return async function () {
    const args = JSON.stringify(arguments);
    cache[args] = cache[args] || fn.apply(undefined, arguments);
    return cache[args];
  };
}

let previousRoute = "";

export const onFetchAsync = async (fn: () => Promise<any>) => {
  onServerPrefetch(async () => {
    try {
      await fn();
    } catch (err) {
      console.error("ON FETCH ASYNC FAILED [server]", err);
      throw err;
    }
  });

  if (typeof window !== "undefined") {
    const { route } = useContext();

    if (previousRoute !== "" && previousRoute !== route.value.fullPath) {
      try {
        await fn();
      } catch (err: unknown) {
        console.error("ON FETCH ASYNC FAILED [client]", err);
      }
    }

    previousRoute = route.value.fullPath;
  }
};
