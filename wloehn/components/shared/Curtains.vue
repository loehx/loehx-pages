<template>
  <div class="absolute inset-0 z-10 overflow-hidden">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Certains",
};
</script>

<style scoped lang="scss">
.left,
.right {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #fff;
  transition: all 3s ease;
}

.left {
  left: -50%;
  right: 50%;

  .visible & {
    transform: translateX(-100%) skew(-60deg);
  }
}

.right {
  left: 50%;
  right: -50%;

  .visible & {
    transform: translateX(100%) skew(-60deg);
  }
}
</style>
