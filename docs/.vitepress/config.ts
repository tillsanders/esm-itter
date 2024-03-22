import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ESMitter",
  description: "ESMitter is a rewrite of the popular EventEmitter3 with a focus on modern tooling, TypeScript, and EcmaScript module syntax.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' },
      { text: 'API Reference', link: '/api' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/esm-itter' },
      { icon: 'github', link: 'https://github.com/tillsanders/esm-itter' }
    ]
  }
})
