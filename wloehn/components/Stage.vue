<!-- Please remove this file from your project -->
<template>
  <div>
    <div class="h-screen w-full relative">
      <Background dotted dotSize="15px" class="bg-primary-400" />
      <Theater>
        <TheaterItem
          v-for="n in 4"
          :key="'left-' + n"
          tag="Cloud"
          :width="10 + (n % 2) * 5"
          :top="50 + n * 5 + (n % 2) * 10"
          :depth="n"
          :right="55 + n * 8"
          :duration="(5 - n) * 2"
          :delay="n - 1"
        />
        <TheaterItem
          v-for="n in 4"
          :key="'right-' + n"
          tag="Cloud"
          :width="10 + (n % 2) * 5"
          :top="50 + n * 5 + (1 - (n % 2)) * 10"
          :depth="n"
          :left="55 + n * 8"
          :duration="(5 - n) * 2"
          :delay="n - 1"
        />
      </Theater>
      <Curtains />
    </div>
  </div>
</template>

<script>
import { useContext } from "@nuxtjs/composition-api";
export default {
  name: "Stage",
  setup() {
    const context = useContext();
    console.log("context", context.contentful);
    return {};
  },
};
</script>
