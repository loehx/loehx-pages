<template>
  <div class="h-[50vh] w-full relative" v-visible="{}">
    <Background dotted dotSize="15px" class="bg-secondary-400" />
    <Theater>
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
</template>

<script>
import { useContext } from "@nuxtjs/composition-api";
export default {
  name: "Footer",
  setup() {
    const context = useContext();
    //console.log("context", context);
    return {};
  },
};
</script>
