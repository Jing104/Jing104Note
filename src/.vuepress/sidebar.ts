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
          text: "Java学习",
          icon: "pen-to-square",
          prefix: "interview/",
          children: [
            { text: "Java基础", link: "Java基础" },
            { text: "Java集合", link: "Java集合" },
            { text: "Java并发", link: "Java并发" },
            { text: "Java虚拟机", link: "Java虚拟机" }
          ],
        },
        {
          text: "小米训练营",
          icon: "pen-to-square",
          prefix: "xiaomi/",
          children: [
            { text: "Day1Java基础", link: "Day1Java基础" },
            { text: "Day2Java泛型与集合", link: "Day2Java泛型与集合" },
            { text: "Day3JavaIO&设计模式", link: "Day3JavaIO&设计模式" },
            { text: "Day4Java8新特性", link: "Day4Java8新特性" },
            // { text: "Day5", link: "Day5" },
            // { text: "Day6", link: "Day6" }
          ],
        }]
    },

    {
      text: "小感性",
      icon: "heart",
      prefix: "posts/",
      children: [
        { text: "感悟随笔", link: "感悟随笔" },
        { text: "观影感悟", link: "观影感悟" },

      ],
    },
    "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    // },
  ],
});
