---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "ESMitter"
  text: "Modern, ESM-only, natively TypeScript event emitter for the browser and Node.js"
  tagline: ESMitter is a fork of the popular EventEmitter3 with a focus on EcmaScript module syntax, TypeScript and modern tooling.
  actions:
    - theme: brand
      text: Get Started
      link: /installation
    - theme: alt
      text: API Reference
      link: /api

features:
  - title: ESM-only
    details: No CommonJS/UMD/AMD, just a pure EcmaScript module with modern ES6+ syntax.
  - title: Natively TypeScript
    details: Rewritten in TypeScript, ESMitter offers strongly typed event context and listeners.
  - title: Great Developer Experience
    details: The latest tooling, Unit Tests, Code Coverage, Benchmarks and decent documentation.
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/tillsanders.png',
    name: 'Till Sanders',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/tillsanders' },
    ]
  },
]
</script>

::: info v1.0.0
This library has been tested using unit tests and has achieved excellent code coverage. It is being
used in production and is considered stable. Contributions are welcome to improve any aspect of the
library, including performance, documentation, and features.
:::

## Team

<VPTeamMembers size="small" :members="members" />
