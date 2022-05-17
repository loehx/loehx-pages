<template>
  <div
    v-scroll-spy
    class="theater-item absolute h-fit w-fit"
    :style="{
      '--duration': duration,
      '--top': top,
      '--delay': delay,
      '--depth': depth,
      '--width': width,
      '--left': typeof left !== 'undefined' ? left + '%' : undefined,
      '--right': typeof right !== 'undefined' ? right + '%' : undefined,
    }"
  >
    <component :is="tag" />
    <div
      class="absolute left-1/2 bottom-1/2 -translate-x-1/2 bg-white"
      :style="{ width: '3px', height: '100vh' }"
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "TheaterItem",
  props: {
    tag: String,
    duration: Number,
    top: Number,
    delay: Number,
    depth: Number,
    width: Number,
    left: Number,
    right: Number,
  },
};
</script>

<style scoped>
.theater-item {
  width: calc(var(--width, 10) * 1rem);
  z-index: var(--depth, 0);
  top: calc(var(--top) * 1%);
  left: calc(
    calc(var(--left) * var(--ss-visible)) +
      calc(calc(1 - var(--ss-visible)) * 100%)
  );
  right: calc(
    calc(var(--right) * var(--ss-visible)) +
      calc(calc(1 - var(--ss-visible)) * 100%)
  );
  --shadow-y: calc(var(--depth, 0) * 10px);
  --shadow-x: calc(var(--shadow-y) / 2 * -1);
  /*--shadow-x: calc(calc(100 - var(--right, 0)) + var(--left, 0)) / 100 *
    var(--shadow-y);*/
  filter: drop-shadow(var(--shadow-x) var(--shadow-y) 1px rgba(0, 0, 0, 10%));
  transition: left calc(var(--duration, 3) * 1s) ease-out
      calc(var(--delay, 0) * 1s),
    right calc(var(--duration, 3) * 1s) ease-out calc(var(--delay, 0) * 1s);
  opacity: var(--ss-visible, 0);
}

/* @keyframes slide {
  0% {
    left: 0%;
    transform: translateX(-100%);
    opacity: 1;
    filter: drop-shadow(
      calc(var(--shadow-offset) * -1) var(--shadow-offset) 1px
        rgba(0, 0, 0, 10%)
    );
  }
  100% {
    left: 100%;
    transform: translateX(0%);
    opacity: 1;
    filter: drop-shadow(
      calc(var(--shadow-offset)) var(--shadow-offset) 1px rgba(0, 0, 0, 10%)
    );
  }
} */
</style>
