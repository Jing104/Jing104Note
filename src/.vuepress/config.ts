import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Jing104-Note",
  description: "Jing104 的学习笔记博客",

  theme,
  head: [
    [
      "script",
      {
        src: "https://unpkg.com/live2d-widget@3.0.4/lib/L2Dwidget.min.js",
      },
    ],
  ],

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
