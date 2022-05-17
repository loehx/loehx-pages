<template>
  <div class="absolute inset-0 z-10" v-visible>
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Certains",
};
</script>

<style scoped>
.left,
.right {
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #fff;
  transition: all 3s ease 0.2s;
}

.left {
  left: -50%;
  right: 50%;
  transform: translateX(calc(var(--ss-visible) * -100%)) skew(-60deg);
}

.right {
  left: 50%;
  right: -50%;
  transform: translateX(calc(var(--ss-visible) * 100%)) skew(-60deg);
}
</style>
