---
icon: pen-to-square
date: 2025-06-21
category:
    - 小米训练营
tag:
    - Java
    - 并发
---
# 并发编程
## JVM、JMM
### 串行、并发、并行
- 并发（Concurrency）指的是系统在同一时间段内处理多个任务的能力。并发关注的是任务之间的交替执行，任务之间可能并不真正同时运行，而是通过任务的分时调度机制，使得多个任务在时间上交错进行，从而给用户一种“同时”执行的感觉。并行（Parallelism）指的是系统同时执行多个任务的能力。
- 并行是指在多个处理器或多核处理器上，真正同时地运行多个任务。并行化的目标是提高程序的执行效率，特别是在需要处理大量数据或计算密集型任务时，并行化可以显著减少任务的完成时间。
### JVM和JMM
#### JVM
- 堆（Heap）：线程共享
- 方法区（Method Area）：线程共享
- 虚拟机栈（VM Stack）：线程私有
- 程序计数器（Program Counter Register）：线程私有
- 本地方法栈（Native Method Stack）：线程私有
#### JMM
在多线程并发过程中，如何处理多线程读同步问题与可见性
- 系统存在一个主内存，对于所有的线程都是共享的
- 每条线程都有自己的工作内存
- 线程对所有变量进行的操作都是先对变量进行拷贝
## 多线程
**为什么使用多线程**
- 程序运行得更快！充分利用CPU资源。
- 目前几乎没有线上得CPU是单核的，发挥多核CPU强大的能力；
**线程生命周期**
从创建到销毁，线程会经历各种状态以及状态之间的转换。
- NEW：初始化状态
- RUNNABLE：可运行/运行状态
- BLOCKED：阻塞状态
- WAITING：无限等待状态
- TIMED_WAITING：有限等待状态
- TERMINATED：终止状态
#### 多线程创建方式
**继承Thread类** 要重写run()方法
**实现Runnable接口**
**实现Callable接口**
#### 线程状态转换
[![pVVx4lq.png](https://s21.ax1x.com/2025/06/21/pVVx4lq.png)](https://imgse.com/i/pVVx4lq)
### 线程池
[![pVVzuB8.png](https://s21.ax1x.com/2025/06/21/pVVzuB8.png)](https://imgse.com/i/pVVzuB8)
手动创建线程池使用ThreadPoolExecutor
Executors 工厂类 能够快速创建相应的线程池，但是容易出现问题，不推荐生产中使用
ExecutorService 线程池核心接口，定义线程池的基本功能，支持 submit、shutdown 等
Executor 更基础的接口，只定义了 execute(Runnable)，是 ExecutorService 的父接口
#### 运行机制
[![pVVzlNQ.png](https://s21.ax1x.com/2025/06/21/pVVzlNQ.png)](https://imgse.com/i/pVVzlNQ)
## 线程安全
**a++操作不是原子的，而是分为三部，读取a的值，值加一，写回内存**
### 线程安全三要素
- 原子性：一个或者多个操作在CPU执行的过程不被中断的特性成为原子性     **使用锁（Synchronized）**
- 有序性：程序执行的顺序按照代码的先后顺序执行（处理器可能会对指令进行重排序）
- 可见性：一个共享变量的更改应当被其他线程可见  **Volatile**
## Java锁机制 Lock接口
- Lock接口提供了更灵活的锁定操作，相比synchronized更加灵活，功能更强
    - 可重入锁 是一种递归的互斥锁，即允许单个线程对共享资源进行重复枷锁，以保证当前线程对共享资源的访问是安全的。ReentrantLock是Java中实现可重入锁的一种方式，它具有较高的灵活性和扩展性
        ReentrantLock分为公平锁和非公平锁
    - 读写锁：是一种共享锁

## 并发集合
### ConcurrentHashMap
[![pVZFhLR.png](https://s21.ax1x.com/2025/06/21/pVZFhLR.png)](https://imgse.com/i/pVZFhLR)
### CopyOnWriteHashmap
### ConcurrentLinkedQueue
### BlockingQueue