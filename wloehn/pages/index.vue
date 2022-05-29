<template>
  <div>
    <ContentModule
      v-for="content in page.contents"
      :key="content.id"
      :data="content"
      :config="config"
      :page="page"
    />
  </div>
</template>

<script lang="ts">
import { ConfigEntry, contentful, PageEntry } from "../data";
import { generateMeta } from "../../core";

export default {
  head() {
    // @ts-ignore
    const page = this.page as PageEntry;
    // @ts-ignore
    const config = this.config as ConfigEntry;

    return generateMeta({
      title: page.title,
      description: page.description,
      faviconSrc: config.favicon?.url,
      author: config.author,
      openGraph: {
        title: page.ogtitle,
        description: page.ogdescription,
        image: page.image,
      },
    });
  },
  async asyncData({ route }: { route: any }) {
    const conf = require("../config.json");
    const [page, config] = await Promise.all([
      contentful.getEntryBySlug<PageEntry>(route.path),
      contentful.getEntry<ConfigEntry>(conf.contentful.configEntryId),
    ]);
    return { page, config };
  },
  provide() {
    return {
      // @ts-ignore
      page: this.page,
      // @ts-ignore
      config: this.config,
    };
  },
};
</script>
