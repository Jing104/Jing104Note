---
icon: pen-to-square
date: 2025-06-23
category:
    - 小米训练营
tag:
    - Java
    - Spring
    - 框架
---
# Spring框架
## Spring简介
### 什么是Spring框架
开源的Java应用程序框架，旨在解决企业应用开发的复杂性。（Bean、轻量级、企业级、IoC、AOP）
### 特性
- 非侵入性
- 控制反转
- 面向切面
- 容器
- 组件化
- 声明式
- 一站式
### 体系结构
[![pVZha9g.png](https://s21.ax1x.com/2025/06/23/pVZha9g.png)](https://imgse.com/i/pVZha9g)
**功能模块**
[![pVZhrBq.png](https://s21.ax1x.com/2025/06/23/pVZhrBq.png)](https://imgse.com/i/pVZhrBq)
## SpringIoC容器和依赖注入
### IoC（Inversion of Control：控制反转或反转控制）容器
[![pVZhsH0.png](https://s21.ax1x.com/2025/06/23/pVZhsH0.png)](https://imgse.com/i/pVZhsH0)
[![pVZhcNT.png](https://s21.ax1x.com/2025/06/23/pVZhcNT.png)](https://imgse.com/i/pVZhcNT)
IoC是一种思想，DI是它的一种实现
#### IoC容器在SpringBoot中的实现（BeanFactory、ApplicationContext）
[![pVZhRCF.png](https://s21.ax1x.com/2025/06/23/pVZhRCF.png)](https://imgse.com/i/pVZhRCF)
**ApplicationContext的具体实现**
[![pVZ4ern.png](https://s21.ax1x.com/2025/06/23/pVZ4ern.png)](https://imgse.com/i/pVZ4ern)
**Spring基于XML的实现细节**
[![pVZ4uV0.png](https://s21.ax1x.com/2025/06/23/pVZ4uV0.png)](https://imgse.com/i/pVZ4uV0)
#### 实例化Bean方式
- 普通方式
- 实例工厂
- 静态工厂
#### 依赖注入方式
- 构造方法
- set方法
#### Spring常用注解
**我们可以把XML配置转换为注解配置**
## AOP
### 相关术语
Joinpoint（连接点）
Pointcut（切入点）：哪些要增强
Advice（通知/增强）：公共代码的抽取
Target（目标对象）：要对那个对象进行增强
Aspect（切面）
### 动态代理
#### JDBC动态代理
需要定义接口
#### CGLib动态代理
不能声明final
## 事务
### 事务特性
事务有4大特性（ACID）：原子性、持久性、一致性、隔离性
### Spring声明式事务
使用@Transactional注解。也只能用于公共方法上，因为背后原理还是AOP动态代理。
### Spring事务传播机制

## RESTful
**REST：表现层资源状态转移**
- 资源：一种看待服务器的方式，将服务器看作是很多离散的资源组成。
- 资源的表述：可以有多种格式，可以通过协商机制来确定，请求-响应方向的表述通常使用不同的格式。
- 状态转移：状态转移说的是：在客户和服务器端之间的转移代表资源状态的表述。通过转移和操作资源的表述，来简介实现操作资源的目的。
**RESTful：**是一种软件架构风格，用于设计网络应用程序和服务之间的通信。
特点：每个URI代表一个资源；使用GET、POST、PUT、DELETE四个操作方式操控资源
## SpringMVC
### 基本概念
### 拦截器
### 请求参数
常规参数  POJO参数  Json参数

