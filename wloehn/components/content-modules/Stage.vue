<template>
  <div v-visible="{ delay: 100 }">
    <div class="h-screen w-full relative">
      <ImageBackground
        asset-name="wallpaper"
        style="background-size: 30rem"
        parallax
      />
      <Theater>
        <TheaterItem
          v-for="n in 4"
          :key="'left-' + n"
          tag="Cloud"
          :width="`${10 + (n % 2) * 5}rem`"
          :top="50 + n * 5 + (n % 2) * 10"
          :depth="n"
          :right="70 + n * 6"
          :duration="(5 - n) * 2"
          :delay="n - 1"
        />
        <TheaterItem
          v-for="n in 4"
          :key="'right-' + n"
          tag="Cloud"
          :width="`${10 + (n % 2) * 5}rem`"
          :top="40 + n * 10 + (1 - (n % 2)) * 10"
          :depth="n"
          :left="70 + n * 6"
          :duration="(5 - n) * 2"
          :delay="n - 1"
        />
      </Theater>
      <!-- <Curtains /> -->
      <TheaterItem
        width="80%"
        :depth="3"
        :top="15"
        :delay="1.5"
        :duration="4"
        center
        class="max-w-[30rem]"
      >
        <div>
          <Frame name="frame-wide" :image="data.coverMobile" />
          <div class="max-w-[30rem] text-center mt-12">
            <h1 class="text-4xl text-white">WUNDERLOEHN</h1>
          </div>
        </div>
      </TheaterItem>
    </div>
  </div>
</template>

<script lang="ts">
import { useContext } from "@nuxtjs/composition-api";
import { AssetEntry, Entry, PageEntry } from "../../data";

interface StageEntry extends Entry {
  name: string;
  h1: string;
  h2: string;
  coverMobile: AssetEntry;
  coverDesktop: AssetEntry;
}

export default {
  name: "Stage",
  props: {
    data: Object as () => StageEntry,
  },
  setup() {
    const context = useContext();
    //console.log("context", context.contentful);
    return {};
  },
};
</script>
