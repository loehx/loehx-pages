<template>
  <div
    class="dotted absolute inset-0"
    :style="{ '--dots-width': dotSize }"
  ></div>
</template>

<script lang="ts">
export default {
  name: "DottedBackground",
  props: {
    dotSize: {
      type: String,
      default: () => "10px",
    },
  },
};
</script>

<style scoped>
.dotted {
  --dots-width: 10px;
  --grid-size: calc(var(--dots-width) * 10);
  --radial-gradient: radial-gradient(
    #ffffff calc(var(--dots-width) - 2px),
    transparent var(--dots-width)
  );
  background-image: var(--radial-gradient), var(--radial-gradient);
  background-position: 0 0,
    calc(var(--grid-size) / 2) calc(var(--grid-size) / 2);
  background-size: var(--grid-size) var(--grid-size);

  transition: all 0.3s ease;
}
</style>
