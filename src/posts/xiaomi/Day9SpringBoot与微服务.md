---
icon: pen-to-square
date: 2025-06-24
category:
    - 小米训练营
tag:
    - Java
    - SpringBoot
    - 微服务
---
# SpringBoot与微服务
## SpringBoot整体概述
**SpringBoot核心特性**
- 约定大于配置
- 场景启动器-starter
- 自动装配
- 嵌入式Web容器
- 生产级别的特性
**三种启动方式**
- 网页启动-SpringBootInitializer-目前只支持JDK17以上
- IDE创建-现在也只支持JDK17
- Maven自己创建SpringBoot项目才能支持JDK8了
### 组建的装配
- 手动装配：基于XML的手动装配；基于注解配置类的手动装配；基于扫描的手动装配
- 自动装配：核心就是本应该有开发者编写的配置，转为框架自动跟据项目中整合的场景依赖，合理地做出判断并装配合适的Bean到IOC容器中；依赖于模块装配（@Import，@Enable*）和条件装配（Profile，@Conditional*）
#### 模块装配
**@Import注解**
- 模块化配置：将不同功能模块的配置分散到独立的配置类，通过@Import整合
- 复用性提升：对于通用的配置类，可在多个项目或者模块中重复使用@Import引入
- 减少样板代码：无需逐个手动注册Bean，提高配置效率
**@EnableXXX**
比如EnableTransactional
#### 条件装配
**Profile**：配置类中加注解然后再application配置文件里配置
**ConditionOnXXX**
### SPI机制（Service Provider Interface）
- 1.定义服务接口
- 2.实现服务接口
- 3.配置服务实现
- 4.服务实现与加载
**显著应用JDBC**
#### SpringFramework SPI
不仅仅局限于接口，可以是任何一个类、接口、注解
#### @SpringApplication注解
不配置扫描包路径的话，只会扫描同类级的包和子包
#### WebMvcAutoConfiguration
### SringBoot的容器
#### BeanFactory与ApplicationContext体系
**BeanFactory体系：**最底层，只支持Bean的管理
**ApplicationContext：**功能更强，还支持生命周期管理等
#### SpringBoot对IoC的扩展
- WebServerApplicationContext：支持嵌入式web
- AnnotationConfigServletWebServerApplicationContext：基于注解驱动的、WebMvc场景下的
**xml配置：**出现比较早、本身比较灵活、可编写内容相对受限
**注解配置：**简单，但是可见性差，每次需要编译
#### BeanDefinition
- Bean的类信息：全限定名
- Bean的属性：作用域、是否默认Bean、描述信息等
- Bean的行为特征；是否延迟加载、是否自动注入、初始化/销毁方法
- 与其他Bean的关系：父Bean名称、依赖的Bean
- Bean的配置属性：构造器参数、属性变量值

### SpringBoot中的AOP
### SpringBoot整合jdbc后的自动配置
Spring Boot默认支持的自动配置包括数据源、JdbcTemplate、事务管理器；它会根据classpath中的类，自动配置数据源
### Mybatis
三层：接口、核心、支持层
适配SpringBoot
# 中间件
## 消息中间件（主要学习RocketMQ）
定义：分布式系统中用于在不同组件或者应用之间传递消息的软件组件或者服务
功能：系统解耦；异步处理；削峰
**RocketMQ：**一款低延迟、高并发、高可用、高可靠的分布式消息中间件。
一个主题里面多个队列，一个队列里面存储多个消息。
- 可靠传输：生产者，broker（持久化），消费者三方面都要考虑
- 顺序消费：怎么实现？？？？
## 分布式协调服务
它是分布式系统中的一个关键组件，他用于确保系统中各个节点之间的数据一致性、协调性（是一个协调服务的节点）
ZooKeeper  Etcd（用在K8S上，容器化）  Consul  Nacos
**为什么需要分布式协调服务？？**
### 分布式锁

**SpringBoot原理啥的还是有点不懂，但是最起码还算会用**


