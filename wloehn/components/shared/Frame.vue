<template>
  <div class="relative">
    <div class="absolute inset-0" :style="styles">
      <slot></slot>
      <ContentfulImage
        :asset="image"
        :width="frameWidth"
        :height="frameHeight"
      />
    </div>
    <ContentfulImage class="" v-if="frameImage" :asset="frameImage" />
  </div>
</template>

<script lang="ts">
import { Entry, AssetEntry, ConfigEntry } from "../../data";
import { computed, ComputedRef, inject } from "@nuxtjs/composition-api";

interface FrameEntry extends Entry {
  frameImage: AssetEntry;
  innerPosition: string;
}

export default {
  name: "Frame",

  props: {
    name: String as () => string,
    image: Object as () => AssetEntry,
  },

  setup(props) {
    const config = inject<ConfigEntry>("config");
    const frame = computed(() =>
      config?.frames.find((k) => k.name === props.name)
    ) as ComputedRef<FrameEntry | undefined>;

    return {
      frameWidth: computed(() => frame.value?.frameImage.width || 0),
      frameHeight: computed(() => frame.value?.frameImage.height || 0),
      frameImage: computed(() => frame.value?.frameImage),
      styles: computed(() => ({
        padding: frame.value?.innerPosition,
      })),
    };
  },
};
</script>
