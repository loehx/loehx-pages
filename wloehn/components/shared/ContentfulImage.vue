<template>
  <nuxt-picture
    :width="imageWidth"
    :height="imageHeight"
    :src="src"
    provider="contentful"
    class="picture block overflow-hidden relative"
    :class="{
      [aspectClass]: aspectClass,
    }"
    :style="styles"
    fit="contain"
    fm="webp"
    loading="lazy"
    :imgAttrs="imgAttrs"
  />
</template>

<script lang="ts">
import { computed } from "@nuxtjs/composition-api";
import { AssetEntry } from "../../data";
const placeHolderImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+PLly38ACZgD3EOjaxgAAAAASUVORK5CYII=";

const ASPECT_RATIOS = {
  "1/1": { ratio: 1 / 1, class: "aspect-[1/1]" },
  "4/3": { ratio: 4 / 3, class: "aspect-[4/3]" },
  "16/9": { ratio: 16 / 9, class: "aspect-[16/9]" },
  "9/16": { ratio: 9 / 16, class: "aspect-[9/16]" },
} as Record<string, { ratio: number; class: string }>;

export default {
  name: "ContentfulImage",
  props: {
    asset: Object as () => AssetEntry,
    width: Number as () => number,
    height: Number as () => number,
    aspectRatio: {
      type: String as () => string,
      validator: (s: string) => s in ASPECT_RATIOS,
    },
  },
  // @ts-ignore
  setup(props: {
    asset: AssetEntry;
    width: number;
    height: number;
    aspectRatio: string;
  }) {
    const aspectRatio = computed(() => ASPECT_RATIOS[props.aspectRatio]);

    const width = computed(() => {
      console.log("CCC", props.width, props.asset.width);
      if (props.width) return props.width;
      return props.asset.width;
    });

    const height = computed(() => {
      if (props.height) return props.height;
      const ratio =
        aspectRatio.value?.ratio ?? width.value! / props.asset.height!;
      return Math.round(width.value! / ratio);
    });

    return {
      src: props.asset.url,
      imageWidth: width,
      imageHeight: height,
      aspectClass: computed(() => aspectRatio.value?.class),
      styles: computed(() => ({})),
      imgAttrs: computed(() => ({
        style: "",
      })),
    };
  },
};
</script>

<style lang="scss">
.picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
</style>
