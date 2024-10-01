import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), svelte()],
  image: {
    domains: ["https://github.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.github.com",
      },
    ],
  },
  markdown: {
    rehypePlugins: [rehypeHeadingIds, rehypeAccessibleEmojis, rehypeKatex],
    remarkPlugins: [remarkToc, remarkMath],
  },
  site: 'https://mathematical-analysis.github.io',
  base: 'mathematical-analysis',
});
