---
icon: pen-to-square
date: 2025-04-23
category:
  - Java并发
tag:
  - Java并发
---

# Java并发
::: important
其实想要了解Java并发，就是要了解JUC即java.util.concurrent这个包
了解多线程、锁、同步等概念，并了解JUC是具体如何实现它们的
:::

## 多线程


### java里面的线程和操作系统线程是一样的吗？

!!Java底层调用Pthread_create创建线程，本质上和操作系统创建线程是一样的，是1对1的模型。!!
### 其他暂略 后续补充

## Synchronized 

### 简单说明 synchronized 是用来干嘛的？

!!实现线程同步，多线程依次获取某个资源，保证数据不会出错!!

### synchronized 到底锁定的是什么元素？

- 修饰方法
  - 静态方法  锁定的是类（无论多少个实例都只会有一个类）。
  - 非静态方法  锁定方法的调用者（对象实例）。
- 修饰代码块  锁定传入的对象


  下面将使用简单代码举例进行详细说明：

  未使用synchronized关键字代码示例：
  ```java
  public class Main {
    public static void main(String[] args) {
    Data data=new Data();
    new Thread(()->{
        data.fuc1();
    }).start();
    
    new Thread(()->{
        data.fuc2();
    }).start();

    }
  }
  class Data {
      public void fuc1(){
          try {
              TimeUnit.SECONDS.sleep(3);
          } catch (InterruptedException e) {
              throw new RuntimeException(e);
          }
          System.out.println("正在执行线程一...");
      }
      public void fuc2(){
          System.out.println("正在执行线程二...");
      }
  }
  //此时func1和func2同时运行，由于fuc1是延迟三秒后打印，所以最终结果立即打印线程二，等待三秒后打印线程一。
  ```
  两个非静态方法都加上synchronized关键字代码示例：
  ```java
  class Data {
    public synchronized void fuc1(){
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("正在执行线程一...");
    }
    public synchronized void fuc2(){
        System.out.println("正在执行线程二...");
    }
  }
  //main函数不变，此时两者排队获取实例data，fuc1先获取，等待三秒后打印线程一；func2再获取立即打印线程二；
  //结果显示为三秒后同时打印线程一和线程二，线程一在前。
  ```
  如果有两个实例，则不会进行资源争夺 代码示例：
  ```java
  public class Main {
    public static void main(String[] args) {
    Data data1=new Data();
    Data data2= new Data();
    new Thread(()->{
        data1.fuc1();
    }).start();

    new Thread(()->{
        data2.fuc2();
    }).start();

    }
  }
  class Data {
      public synchronized void fuc1(){
          try {
              TimeUnit.SECONDS.sleep(3);
          } catch (InterruptedException e) {
              throw new RuntimeException(e);
          }
          System.out.println("正在执行线程一...");
      }
      public synchronized void fuc2(){
          System.out.println("正在执行线程二...");
      }
  }
  //结果为分别占用不同的实例data1和data2，两个线程同时运行，由于fuc1是延迟三秒后打印，所以最终结果立即打印线程二，等待三秒后打印线程一。
  ```
 如果两个方法为静态，则整个类变为资源，代码示例：
 ```java
public class Main {
    public static void main(String[] args) {
//    Data data1=new Data();
//    Data data2= new Data();
    new Thread(()->{
        Data.fuc1();
    }).start();

    new Thread(()->{
        Data.fuc2();
    }).start();

    }
    }
    class Data {
        public synchronized static void fuc1(){
            try {
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            System.out.println("正在执行线程一...");
        }
        public synchronized static void fuc2(){
            System.out.println("正在执行线程二...");
        }
    }
  //此时两个线程争夺Data类，fuc1先获取，等待三秒后打印线程一；func2再获取立即打印线程二；
  //结果显示为三秒后同时打印线程一和线程二，线程一在前。
  //将两个方法放于两个类Data1和Data2中则不会再竞争资源。
 ```
 ### 那么倘若synchronized修饰一个静态方法和一个非静态方法呢？比如说func1是非静态，func2是静态，两者分别使用实例data和类Data进行调用，会占用同一个资源吗？

 答案：!!类与实例并不算同一资源，两个线程会同时执行，大家可以自己进行代码尝试!!

## ReentrantLock

## ReadWriteLock

## Volatile

## CountDownLatch

## CyclicBarrier

## Semaphore

## Future和Callable

## ConcurrentHashMap

## CAS
CAS 全称 Compare And Swap ，实现cpu原子性，是一个cpu并发原语。
在替换内存中某个位置的值时，先比较该值和预期的值是否一致，如果一致则执行替换操作，这个替换操作是原子性操作。

## AQS
AQS 全称Abstract Queued Synchronizer ，作用为原子性的实现管理同步、阻塞线程和唤醒线程的功能。

```markmap
# AbstractQueuedSynchronizer (AQS)
## 原子性实现功能
- 管理同步
- 阻塞线程
- 唤醒线程
## 具体应用
- ReentrantLock
- CountDownLatch
- Semaphore
## 核心组成
### 同步状态（state）
- 使用 volatile 修饰，保证内存可见性
- 可通过 CAS 操作原子修改

### 队列（CLH 队列）
- 先进先出（FIFO）队列
- Node 节点结构：prev、next、thread、waitStatus
- 用于管理被阻塞的线程

### Node 等待状态
- SIGNAL：前驱节点释放锁后唤醒当前节点
- CANCELLED：线程取消等待
- CONDITION：等待条件
- PROPAGATE：共享模式传播

## 模式
### 独占模式（Exclusive）
- 只有一个线程能访问临界区
- 使用模板方法 tryAcquire/tryRelease 实现

### 共享模式（Shared）
- 多个线程可同时访问临界区（如信号量）
- 使用 tryAcquireShared/tryReleaseShared

```

## 线程池

