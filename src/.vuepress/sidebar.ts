import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "学习笔记",
      icon: "book",
      prefix: "posts/",
      children: [
        {
          text: "面试八股文",
          icon: "pen-to-square",
          prefix: "interview/",
          children: [
            { text: "Java基础",  link: "Java基础" },
            { text: "Java集合",  link: "Java集合" },
            { text: "Java并发",  link: "Java并发" },
            { text: "Java虚拟机",  link: "Java虚拟机" }
          ],
        }]
    },
    "intro",
    {
      text: "感悟随笔",
      icon: "heart",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    },
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    },
  ],
});
