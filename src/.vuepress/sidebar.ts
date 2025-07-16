import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "八股算法",
      collapsible: true,
      icon: "book-open", // 算法知识类
      prefix: "/posts/",
      children: [
        {
          text: "Java学习",
          collapsible: true,
          icon: "fa-brands fa-java", // Java 图标
          prefix: "interview/",
          children: [
            { text: "Java基础", link: "Java基础" },
            { text: "Java集合", link: "Java集合" },
            { text: "Java并发", link: "Java并发" },
            { text: "Java虚拟机", link: "Java虚拟机" },
            { text: "Spring", link: "Spring" }
          ],
        },
        {
          text: "算法",
          collapsible: true,
          icon: "sitemap", // 算法结构
          prefix: "algorithm/",
          children: [
            { text: "哈希", link: "哈希" },
            { text: "双指针", link: "双指针" },
            { text: "滑动窗口", link: "滑动窗口" },
            { text: "子串", link: "子串" },
            { text: "矩阵", link: "矩阵" },
            { text: "普通数组", link: "普通数组" },
            { text: "移除元素", link: "移除元素" },
            { text: "二叉树", link: "二叉树" },
            { text: "二分", link: "二分" }
          ],
        },
      ]
    },

    {
      text: "实习实训网课",
      collapsible: true,
      icon: "chalkboard-teacher", // 教学类图标
      prefix: "/posts/",
      children: [
        {
          text: "Bilibili网课",
          collapsible: true,
          icon: "video", // 视频课程
          prefix: "BiliBiliStudy/",
          children: [
            { text: "苍穹外卖", link: "苍穹外卖" },
            { text: "Git版本管理", link: "Git版本管理" },
            { text: "RabbitMQ", link: "RabbitMQ" },
          ],
        },
        {
          text: "小米训练营",
          collapsible: true,
          icon: "building", // 企业实训
          prefix: "xiaomi/",
          children: [
            { text: "Day1Java基础", link: "Day1Java基础" },
            { text: "Day2Java泛型与集合", link: "Day2Java泛型与集合" },
            { text: "Day3JavaIO&设计模式", link: "Day3JavaIO&设计模式" },
            { text: "Day4Java8新特性", link: "Day4Java8新特性" },
            { text: "Day5网络编程", link: "Day5网络编程" },
            { text: "Day6并发编程", link: "Day6并发编程" },
            { text: "Day7数据库编程", link: "Day7数据库编程" },
            { text: "Day8Spring基础", link: "Day8Spring基础" },
            { text: "Day9SpringBoot与微服务", link: "Day9SpringBoot与微服务" },
            { text: "Day10中间件和缓存", link: "Day10中间件和缓存" },
            { text: "Day11性能优化与调优", link: "Day11性能优化与调优" },
            { text: "Day12-15AI客服实践", link: "Day12-15AI客服实践" },
          ],
        }
      ]
    },

    {
      text: "小感性",
      collapsible: true,
      icon: "feather",
      prefix: "posts/",
      children: [
        { text: "感悟随笔", link: "感悟随笔", icon: "pen" },
        { text: "观影感悟", link: "观影感悟", icon: "film" },
      ],
    },

    "intro",
  ],
});
