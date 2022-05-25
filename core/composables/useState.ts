import { toRef, ssrRef, useContext } from "@nuxtjs/composition-api";
import type { Ref } from "@nuxtjs/composition-api";

/*
 * Big thanks to Jamiewarb!
 * https://gist.github.com/Jamiewarb/21d915841395a42bb1b48ea21d03cfde
 */

/**
 * Create a global reactive ref that will be hydrated but not shared across ssr requests
 *
 * @param key a unique key ensuring that data fetching can be properly de-duplicated across requests
 * @param init a function that provides initial value for the state when it's not initiated
 */
export const useState = <T>(key: string, init?: () => T): Ref<T> => {
  const { $state } = useContext().app;

  // Using `toRef` to keep `state` in-sync across components. `ssrRef` to sync server to client for hydration.
  const state = toRef($state, key);
  const ssrState = ssrRef($state[key], key);

  if (state.value === undefined) {
    if (state.value !== ssrState.value) {
      // If the value was initialised or changed on the server we can hydrate it from the ssrState
      state.value = ssrState.value;
    } else if (init) {
      // Otherwise we can initialise both now for the first time (usually only called serverside)
      state.value = init();
      ssrState.value = init();
    }
  }

  return state;
};
