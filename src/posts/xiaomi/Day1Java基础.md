---
icon: pen-to-square
date: 2025-06-16
category:
    - 小米训练营
tag:
    - Java
    - SE
---
# Day1   Java基础
[![pVE9mct.png](https://s21.ax1x.com/2025/06/16/pVE9mct.png)](https://imgse.com/i/pVE9mct)
老师默认我们了解Java的相关知识，今天学习的主要内容是JavaSE的复习。
## 01 Java基础简介
### Java历史
[![pVE9tcq.png](https://s21.ax1x.com/2025/06/16/pVE9tcq.png)](https://imgse.com/i/pVE9tcq)
### Java语言特点
[![pVE9wHU.png](https://s21.ax1x.com/2025/06/16/pVE9wHU.png)](https://imgse.com/i/pVE9wHU)
- 强类型语言？？？
（程序跑起来之后里面每一个类型都是确定的）
静态类型检查：!!在程序编译阶段就会进行类型的检查，确保每个变量和函数的使用符合其声明的类型，不匹配时会立即提示错误。!!
提供类型安全：!!由于有静态检查机制，能防止类型错误在运行时出现，增强了程序的安全性和可靠性。!!
- 安全性？？？
沙箱机制： 指的是一种安全隔离技术，将程序限制在一个受控的执行环境中运行，防止其对系统其他部分产生影响。即使程序中存在恶意代码，也只能在沙箱中活动，不能访问关键系统资源。
运行时安全检查： 指程序在执行过程中进行的安全检查，比如内存访问是否越界、是否使用了未初始化的变量、是否有权限进行某些操作等。这有助于在程序运行时及时发现并阻止潜在的安全问题。
### Java应用领域
[![pVE9fHO.png](https://s21.ax1x.com/2025/06/16/pVE9fHO.png)](https://imgse.com/i/pVE9fHO)
市场上最主要的还是前后端分离的Web，其次就是移动端（个人理解，本质也是前后端分离），Java都作为后端服务。
**实时处理 vs 离线处理**
大数据处理中，实时处理和离线处理是两种主要的数据处理方式，它们的区别体现在处理时效性、技术架构、应用场景等方面。
实时处理是将流数据做一个切割，立即对其进行处理然后放回数据传输；离线处理类似一个延迟的汇总任务，是一个批处理。
| 项目           | 实时处理（Real-time Processing）           | 离线处理（Batch / Offline Processing）                |
|----------------|---------------------------------------------|--------------------------------------------------------|
| 处理时间       | 几毫秒到几秒内                              | 通常以分钟、小时甚至天为单位                          |
| 数据来源       | 流式数据（如日志流、传感器数据）           | 批量数据（如数据库、文件系统中的历史数据）           |
| 典型工具       | Apache Flink、Apache Storm、Kafka Streams  | Apache Hadoop、Apache Spark（批处理模式）            |
| 数据粒度       | 单条或小批量处理                            | 大批量数据处理                                        |
| 延迟（Latency）| 极低（低延迟）                              | 高延迟（可容忍）                                      |
| 应用场景       | 实时监控、欺诈检测、在线推荐                | 数据仓库分析、报表生成、训练机器学习模型             |
| 系统复杂度     | 更复杂（需要流处理架构）                    | 相对简单，容错性好                                    |
| 计算模型       | 流计算（Streaming）                         | 批处理（Batch）                                       |
### Java基础语法
#### 数据类型与变量
[![pVE9Xb8.png](https://s21.ax1x.com/2025/06/16/pVE9Xb8.png)](https://imgse.com/i/pVE9Xb8)
实际应用场景中，某些情况，浮点型数据传输是比较浪费的。如果对数据比较敏感，可以自己定义协议来规定数据传输类型（用整型？如何实现？）。
#### 运算符
[![pVECpCj.png](https://s21.ax1x.com/2025/06/16/pVECpCj.png)](https://imgse.com/i/pVECpCj)
#### 控制结构
[![pVECFK0.png](https://s21.ax1x.com/2025/06/16/pVECFK0.png)](https://imgse.com/i/pVECFK0)
#### 方法（定义与调用）
[![pVECAbT.png](https://s21.ax1x.com/2025/06/16/pVECAbT.png)](https://imgse.com/i/pVECAbT)
返回值有的可以通过参数列表返回？？？？
#### 递归调用
[![pVECnPJ.png](https://s21.ax1x.com/2025/06/16/pVECnPJ.png)](https://imgse.com/i/pVECnPJ)
快速排序，树的节点遍历，二分，斐波那契数列......
练习斐波那契数列：第一项和第二项均为一，从第三项开始，每一项都是前两项的和。
### 异常（Exception&Error）
[![pVEChMq.png](https://s21.ax1x.com/2025/06/16/pVEChMq.png)](https://imgse.com/i/pVEChMq)
[![pVEC4s0.png](https://s21.ax1x.com/2025/06/16/pVEC4s0.png)](https://imgse.com/i/pVEC4s0)
![image-a2fbf485c847070e66e11396f333c04e.png](https://t.tutu.to/img/l6s8S)
- Error（错误）：表示运行时环境的错误。错误是程序无法处理的严重问题，如系统崩溃、虚拟机错误、动态链接失败等。通常，程序不应该尝试捕获这类错误。例如，OutOfMemoryError、StackOverflowError等。理论上能够捕获到，但是一般不会捕获，因为实际项目中遇到Error就直接重启服务了

- Exception（异常）：表示程序本身可以处理的异常条件。异常分为两大类：
    - 非运行时异常：这类异常在编译时期就必须被捕获或者声明抛出。它们通常是外部错误，如文件不存在（FileNotFoundException）、类未找到（ClassNotFoundException）等。非运行时异常强制程序员处理这些可能出现的问题，增强了程序的健壮性。
    - 运行时异常：这类异常包括运行时异常        （RuntimeException）和错误（Error）。运行时异常由程序错误导致，如空指针访问（NullPointerException）、数组越界（ArrayIndexOutOfBoundsException）等。运行时异常是不需要在编译时强制捕获或声明的。
    ![image-d9fb152c5cdf567601589e1bda2419c4.png](https://t.tutu.to/img/l6Vg4)
    ```java
    public class Main {
    public static void main(String[] args) {
        try{
        int result = 10/0;

        }catch(RuntimeException e){
            System.out.println(e);

        }

    }
}
    ```
### 类与对象
![image-18bbdd7d7c4345f3b48026a837b453d7.png](https://t.tutu.to/img/l6Anh)
#### 继承与多态
![image-18bbdd7d7c4345f3b48026a837b453d7.png](https://t.tutu.to/img/l6Anh)
![image-db0b25a81103b06e3926310eb9916e24.png](https://t.tutu.to/img/l6HY6)
避免重复造轮子，减少代码重复度
#### 封装与抽象
![alt text](image.png)
属性设置为private，通过setter和getter来访问和修改（Lombok通过@Data注解可以快速实现）；方法可以用public，因为方法是我们自己控制的
#### 接口与抽象类
![image-4f4a6708c021aaeca45c813f0190fb54.png](https://t.tutu.to/img/l6Gc5)
![image-e82a45f7f0ef2e884b934687e330a1ac.png](https://t.tutu.to/img/l6gRB)
### Java平台
#### JDK JRE JVM
JVM是Java虚拟机，是Java程序运行的环境。它负责将Java字节码（由Java编译器生成）解释或编译成机器码，并执行程序。JVM提供了内存管理、垃圾回收、安全性等功能，使得Java程序具备跨平台性。
JDK是Java开发工具包，是开发Java程序所需的工具集合。它包含了JVM、编译器（javac）、调试器（jdb）等开发工具，以及一系列的类库（如Java标准库和开发工具库）。JDK提供了开发、编译、调试和运行Java程序所需的全部工具和环境。
JRE是Java运行时环境，是Java程序运行所需的最小环境。它包含了JVM和一组Java类库，用于支持Java程序的执行。JRE不包含开发工具，只提供Java程序运行所需的运行环境。
#### 类加载器
启动类加载器（Bootstrap Class Loader）：这是最顶层的类加载器，负责加载Java的核心库（如位于jre/lib/rt.jar中的类），它是用C++编写的，是JVM的一部分。启动类加载器无法被Java程序直接引用。
扩展类加载器（Extension Class Loader）：它是Java语言实现的，继承自ClassLoader类，负责加载Java扩展目录（jre/lib/ext或由系统变量Java.ext.dirs指定的目录）下的jar包和类库。扩展类加载器由启动类加载器加载，并且父加载器就是启动类加载器。
系统类加载器（System Class Loader）/ 应用程序类加载器（Application Class Loader）：这也是Java语言实现的，负责加载用户类路径（ClassPath）上的指定类库，是我们平时编写Java程序时默认使用的类加载器。系统类加载器的父加载器是扩展类加载器。它可以通过ClassLoader.getSystemClassLoader()方法获取到。
自定义类加载器（Custom Class Loader）：开发者可以根据需求定制类的加载方式，比如从网络加载class文件、数据库、甚至是加密的文件中加载类等。自定义类加载器可以用来扩展Java应用程序的灵活性和安全性，是Java动态性的一个重要体现。
#### 类加载过程
- 加载：通过类的全限定名（包名 + 类名），获取到该类的.class文件的二进制字节流，将二进制字节流所代表的静态存储结构，转化为方法区运行时的数据结构，在内存中生成一个代表该类的Java.lang.Class对象，作为方法区这个类的各种数据的访问入口

- 连接：验证、准备、解析 3 个阶段统称为连接。

- 验证：确保class文件中的字节流包含的信息，符合当前虚拟机的要求，保证这个被加载的class类的正确性，不会危害到虚拟机的安全。验证阶段大致会完成以下四个阶段的检验动作：文件格式校验、元数据验证、字节码验证、符号引用验证

- 准备：为类中的静态字段分配内存，并设置默认的初始值，比如int类型初始值是0。被final修饰的static字段不会设置，因为final在编译的时候就分配了

- 解析：解析阶段是虚拟机将常量池的「符号引用」直接替换为「直接引用」的过程。符号引用是以一组符号来描述所引用的目标，符号可以是任何形式的字面量，只要使用的时候可以无歧义地定位到目标即可。直接引用可以是直接指向目标的指针、相对偏移量或是一个能间接定位到目标的句柄，直接引用是和虚拟机实现的内存布局相关的。如果有了直接引用， 那引用的目标必定已经存在在内存中了。

- 初始化：初始化是整个类加载过程的最后一个阶段，初始化阶段简单来说就是执行类的构造器方法（() ），要注意的是这里的构造器方法()并不是开发者写的，而是编译器自动生成的。

- 使用：使用类或者创建对象

- 卸载：如果有下面的情况，类就会被卸载：1. 该类所有的实例都已经被回收，也就是Java堆中不存在该类的任何实例。2. 加载该类的ClassLoader已经被回收。 3. 类对应的Java.lang.Class对象没有任何地方被引用，无法在任何地方通过反射访问该类的方法。
### 数据结构
#### 数组和链表
#### 栈和队列
#### 树
#### 图
#### 常用搜索算法
#### 集合框架（List Set Map）
- List允许元素重复，有序存储
- Set不允许元素重复，无序存储
- Map存储键值对，键不允许重复，通过键获取值
## 02 开发工具介绍
### Git工具
![image-df49bcf6c2f2217dc7970ce5b6d78172.png](https://t.tutu.to/img/lFa2A)
#### 基本命令
![image-7c917b45b64599dad4fd5f5026f6c40f.png](https://t.tutu.to/img/lFhrP)
### Maven
## 03 编码规范
### 编码风格
#### 命名风格
[![pVEAcgH.png](https://s21.ax1x.com/2025/06/16/pVEAcgH.png)](https://imgse.com/i/pVEAcgH)
Java编码用驼峰，SQL用“_”已经成为默认规范了。命名尽量用英文，少用或不用拼音。
[![pVEAWDI.png](https://s21.ax1x.com/2025/06/16/pVEAWDI.png)](https://imgse.com/i/pVEAWDI)
### 注释规范（单行注释、块注释、文档注释）
[![pVEA4VP.png](https://s21.ax1x.com/2025/06/16/pVEA4VP.png)](https://imgse.com/i/pVEA4VP)
### 代码组织
#### 类与方法的设计
[![pVEEUJS.png](https://s21.ax1x.com/2025/06/16/pVEEUJS.png)](https://imgse.com/i/pVEEUJS)
#### 避免代码重复和过度设计
[![pVEE0Mj.png](https://s21.ax1x.com/2025/06/16/pVEE0Mj.png)](https://imgse.com/i/pVEE0Mj)
## 04 Linux基础知识介绍
当前最主流的服务器操作系统还是Linux，项目的部署、运维等都要用到Linux（运维干的事后端开发来干！！？？老板让你干啥你就得干啥，身兼数职促进你成长[doge]）
### Linux概述
#### Linux是什么
一个开源的操作系统内核，最初由Linus Torvalds开发。它是基于Unix系统的设计，提供稳定和安全的环境。作为开源软件，Linux允许用户自由使用】修改和分发。
#### Linux历史
看了也记不住，也不用记住，想了解的自己去搜搜看吧。
#### Linux的特点和优势
- 开源免费
- 安全可靠
- 性能好和稳定（Windows半年不关机你试试[doge]）
- 多用户和多任务
- 一切皆文件
 ### linux基本命令
 #### 机器性能查询
 ![image-375cb76c08b5b5f1fc37367338f027cc.png](https://t.tutu.to/img/lFfir)
## 05 典型业务架构
### Web网站
![image-a2a8292610217c0dccac9442f4461f09.png](https://t.tutu.to/img/lFM6B)
### 物联网
![image-fd13f5d2fd4c31d5958695083eb0d056.png](https://t.tutu.to/img/lFeMd)
