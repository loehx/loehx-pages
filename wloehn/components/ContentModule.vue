<template>
  <section>
    <component :is="'m-' + data.type" :data="data" />
  </section>
</template>

<script>
const MODULES = [
  { type: "stage", render: () => import("./content-modules/Stage.vue") },
  { type: "text", render: () => import("./content-modules/TextModule.vue") },
  { type: "footer", render: () => import("./content-modules/Footer.vue") },
];

export default {
  name: "ContentModule",
  components: MODULES.reduce(
    (r, c) => ({ ...r, ["m-" + c.type]: c.render }),
    {}
  ),
  props: {
    data: Object,
  },
};
</script>
