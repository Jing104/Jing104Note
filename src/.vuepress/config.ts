import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Jing104-Note",
  description: "Jing104 的学习笔记博客",

  theme,
  

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
