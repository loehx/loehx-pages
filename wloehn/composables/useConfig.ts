import { inject, ref } from "@nuxtjs/composition-api";
import { ConfigEntry } from "../data";

export default () => {
  const config = inject<ConfigEntry>("config");

  return {
    config: ref(config),
    getAssetByName: (name: string) =>
      config?.assets.find(
        (a) => a.name.toLowerCase() === name.toLocaleLowerCase()
      ),
    getFrameByName: (name: string) =>
      config?.assets.find(
        (a) => a.name.toLowerCase() === name.toLocaleLowerCase()
      ),
  };
};
