<template>
  <div
    class="background absolute inset-0"
    :style="styles"
    v-scroll-spy="parallax"
  ></div>
</template>

<script lang="ts">
import { computed } from "@nuxtjs/composition-api";
import { useConfig } from "../../composables";

export default {
  name: "Background",
  props: {
    assetName: String,
    parallax: Boolean,
  },
  // @ts-ignore
  setup(props: { assetName: string }) {
    const { getAssetByName } = useConfig();
    const asset = getAssetByName(props.assetName);
    const src = `${asset?.url}?fm=webp`;
    return {
      styles: computed(() => ({
        backgroundImage: `url('${src}')`,
      })),
    };
  },
};
</script>

<style lang="scss" scoped>
.background {
  background-position: 0 0;

  .visible & {
    background-position: 0 calc(var(--ss-visibility) * -20%);
  }
}
</style>
