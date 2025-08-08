import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ESMitter",
  description:
    "ESMitter is a fork of the popular EventEmitter3 with a focus on EcmaScript module syntax, TypeScript and modern tooling.",
  base: "/esm-itter/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/installation" },
      { text: "API Reference", link: "/api" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Installation", link: "/installation" },
          { text: "Setup", link: "/setup" },
          { text: "Usage", link: "/usage" },
          { text: "Context", link: "/context" },
          { text: "Compatibility and EventEmitter3", link: "/compatibility" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Types", link: "/api/types" },
          { text: "addListener()", link: "/api/addListener" },
          { text: "emit()", link: "/api/emit" },
          { text: "eventNames()", link: "/api/eventNames" },
          { text: "listenerCount()", link: "/api/listenerCount" },
          { text: "listeners()", link: "/api/listeners" },
          { text: "off()", link: "/api/off" },
          { text: "on()", link: "/api/on" },
          { text: "once()", link: "/api/once" },
          { text: "removeAllListeners()", link: "/api/removeAllListeners" },
          { text: "removeListener()", link: "/api/removeListener" },
        ],
      },
    ],

    socialLinks: [
      { icon: "npm", link: "https://www.npmjs.com/package/esm-itter" },
      { icon: "github", link: "https://github.com/tillsanders/esm-itter" },
    ],
  },
});
