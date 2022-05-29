import { RouteConfig } from "@nuxt/types/config/router";
import { contentful, PageEntry } from "./data";

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  mode: "universal",

  server: {
    port: 4000,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "wloehn",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/helpers/index.ts",
    "~/../core/plugins/components.ts",
    "~/../core/plugins/scrollSpy.ts",
    "~/../core/plugins/visible.ts",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
    {
      path: "~/../core/components",
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://image.nuxtjs.org/getting-started
    "@nuxt/image",
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    // https://composition-api.nuxtjs.org/
    "@nuxtjs/composition-api/module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    async extendRoutes(routes: RouteConfig[], resolve: any) {
      console.log("extend routes ...");
      const pages = await contentful.getEntriesByType<PageEntry>("page", {
        include: 1,
      });
      pages.forEach((page) =>
        routes.push({
          name: page.teaserTitle,
          path: page.slug,
          component: resolve(__dirname + "/pages/index.vue"),
        })
      );
    },
  },

  // FIXME: this does simply not work...
  // generate: {
  //   async routes() {
  //     const pages = await contentful.getEntriesByType<PageEntry>("page", {
  //       include: 1,
  //     });
  //     return pages.map((page) => ({
  //       route: page.slug,
  //     }));
  //   },
  // },

  image: {
    contentful: {},
  },

  devServerHandlers: [],
};
