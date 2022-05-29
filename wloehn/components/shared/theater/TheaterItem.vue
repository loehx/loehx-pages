<template>
  <div
    class="theater-item absolute h-fit w-fit"
    :class="{
      'theater-item__default': !center,
      'theater-item__center': center,
    }"
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
    <div
      class="absolute left-1/2 bottom-1/2 -translate-x-1/2 bg-white opacity-50"
      :style="{ width: '3px', height: '100vh' }"
    ></div>
    <component :is="tag" class="relative" />
    <slot></slot>
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
    width: String,
    left: Number,
    right: Number,
    center: Boolean,
  },
};
</script>

<style scoped lang="scss">
.theater-item {
  width: var(--width);
  z-index: var(--depth, 0);
  --shadow-y: calc(var(--depth, 0) * 10px);
  --shadow-x: calc(var(--shadow-y) / 2 * -1);
  /*--shadow-x: calc(calc(100 - var(--right, 0)) + var(--left, 0)) / 100 *
    var(--shadow-y);*/
  filter: drop-shadow(var(--shadow-x) var(--shadow-y) 1px rgba(0, 0, 0, 20%));

  &__center {
    left: 50%;
    transform: translate(-50%, -200%);
    top: -50%;

    .visible & {
      animation: default-entrance calc(var(--duration, 3) * 1s) ease;
      transform: rotate(0deg) translate(-50%, 0);
      top: calc(var(--top) * 1%);
    }
  }

  &__default {
    top: calc(var(--top) * 1%);
    left: 100%;
    right: 100%;
    transition: left calc(var(--duration, 3) * 1s) ease-out
        calc(var(--delay, 0) * 1s),
      right calc(var(--duration, 3) * 1s) ease-out calc(var(--delay, 0) * 1s);
    opacity: 0;

    .visible & {
      left: var(--left);
      right: var(--right);
      opacity: 1;
    }
  }
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

@keyframes default-entrance {
  0% {
    top: -50%;
    transform: rotate(-2deg) translate(-50%, 0);
    transform-origin: top left;
    animation-timing-function: ease-in-out;
  }
  20%,
  60% {
    transform: rotate(3deg) translate(-53%, 0);
    transform-origin: top left;
    animation-timing-function: ease-in-out;
  }
  40% {
    transform: rotate(-3deg) translate(-47%, 0);
    transform-origin: top left;
    animation-timing-function: ease-in-out;
  }
  80% {
    transform: rotate(-3deg) translate(-47%, 0);
    transform-origin: top left;
    animation-timing-function: ease-in-out;
  }
  100% {
  }
}
</style>
