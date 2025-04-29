import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  //demo页
  // "/demo/",
  {
    text: "学习笔记",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "面试八股文",
        icon: "pen-to-square",
        prefix: "interview/",
        children: [
          { text: "Java基础", icon: "pen-to-square", link: "Java基础" },
          { text: "Java集合", icon: "pen-to-square", link: "Java集合" },
          { text: "Java并发", icon: "pen-to-square", link: "Java并发" },
          { text: "Java虚拟机", icon: "pen-to-square", link: "Java虚拟机" }
        ],
      },
      {
        text: "算法结题",
        icon: "pen-to-square",
        prefix: "algorithm/",
        children: [
          {
            text: "算法 1",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "算法 2",
            icon: "pen-to-square",
            link: "2",
          }
        ],
      },
      { text: "感悟随笔", icon: "pen-to-square", link: "感悟随笔" },
      { text: "观影感悟", icon: "pen-to-square", link: "观影感悟" }
    ],
  },
  //主题官网
  // {
  //   text: "V2 文档",
  //   icon: "book",
  //   link: "https://theme-hope.vuejs.press/zh/",
  // },
]);
