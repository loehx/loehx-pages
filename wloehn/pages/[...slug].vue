<template>
  <Nuxt />
</template>

<script lang="ts">
import { contentful, PageEntry } from "../data";

export default {
  async asyncData({ route }: { route: any }) {
    const pageData = await contentful.getEntryBySlug<PageEntry>(route.path);
    console.log("...slug", pageData.id);
  },
};
</script>
