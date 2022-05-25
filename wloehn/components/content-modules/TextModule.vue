<template>
  <div class="min-h-screen w-full relative container">
    <div v-html="html"></div>
  </div>
</template>

<script lang="ts">
import { reactive } from "@nuxtjs/composition-api";
import { Entry } from "../../data";
import { renderMarkdown } from "../../../core/";

interface TextEntry extends Entry {
  text: string;
}

export default {
  name: "TextModule",
  props: {
    data: Object as () => TextEntry,
  },
  // @ts-ignore
  setup(props: { data: TextEntry }) {
    const data = reactive(props.data);
    return {
      html: renderMarkdown(data.text),
    };
  },
};
</script>
