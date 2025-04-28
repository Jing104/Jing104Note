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
 ### 那么倘若synchronized修饰一个静态方法和一个非静态方法呢？比如说func1是非静态，func2是静态，两者分别使用实例data和类Data进行调用，会同步吗？

 答案：!!类与实例并不算同一资源，两个线程会同时执行，大家可以自己进行代码尝试!!

 ### 那么倘若一个synchronized修饰的静态方法，被线程一使用类调用，又被线程二使用实例调用（当然这不符合规范），会产生同步吗？
 !!会的!!

## ReentrantLock
ReentrantLock 基于AQS，可以通过公平锁或者非公平锁来实现同步，其与Synchronized一样，也是可重入的。其优点就是更加灵活，功能更加丰富。
其实现了Lock接口，内部有一个私有的final抽象类Sync（继承自AQS，一旦设置值不可修改），除了实现Lock的方法外。内部还有FairLock和Nonfairlock两个继承自Sync的子类。

## ReadWriteLock
允许多个读锁同时运行，但是读与写、写与写相互排斥，一次只能有一个写锁。

## Volatile
Volatile也是一种关键字，其作用是保证共享变量可见性（工作内存？主内存？有点类似于flush刷新主存）以及防止指令重排（单线程一般不会重排，但是多线程并发可能会对指令重排）。

避免指令重排基于happens-before原则，实现原理为：内存屏障。

## CountDownLatch

当线程想要启动时，发现Countdown不为0，则会加入到同步队列中发生阻塞（AQS同步队列）。
当现有线程执行完后，则会将CountDown减1，当减为0时，会唤醒同步队列里的线程。
当其减为零时，不能再次使用，要重新创建一个countdownlatch。

## CyclicBarrier
即循环屏障，实现将多个线程同时开始操作。其内置计数器，当计数器的值达到我们规定的某个值时，所有的线程同时开始操作继续执行。其内部具有异常处理，当一个线程发生异常时，就会进行异常处理。

## Semaphore
也是基于AQS实现。state可以大于1，表示共享资源可以被多少个线程占有，当其为0时，想要获取资源的线程就会进入同步队列。

## Future、FutureTask和Callable

线程创建方式除了实现Runnable接口重构无参方法run()之外还可以调用Callable接口重构call()方法，不同的是call方法提供返回值。
创建线程时，实现Runnable的线程对象可以直接传入Thread作为参数，但是实现Callable接口必须先传入FutureTask对象，再将FutureTask对象作为参数传入Thread。
```java
class MyRunnable implements Runnable{
    @Override
    public void run(){
        //线程执行代码
    }
}
class MyCallable implements Callable{
    @Override
    public Integer call(){
        //线程执行代码
        return 1;
    }
}
public static void main(String[] args){
    Thead r = new Thead(new MyRunnable());
    r.start();
    FutureTask<Integer> f = new FutureTask<>(new MyCallable());
    Thead c = new Thread(f);
    c.start();
    try{
        Integer result = f.get();//获取线程执行结果
    } catch(InterruptedException|ExecutorException){
        e.printStackTrace();
    }
}
```

## ConcurrentHashMap
jdk1.7中使用的是segment（继承自ReentrantLock）分段锁（将一个数组分段，分成多个小数组，每个数组都有若干个HashEntry），锁粒度较大；1.8中其数据结构就与Hashmap类似了，使用Node数组+链表+红黑树，对每个头节点（因为会有链表或者红黑树）（1.8将数组中的每个桶由原来的HashEntry对象改为Node对象）都使用锁（Synchronized），锁粒度更小，

## CAS
CAS 全称 Compare And Swap ，实现cpu原子性，是一个cpu并发原语。
在替换内存中某个位置的值时，先比较该值和预期的值是否一致，如果一致则执行替换操作，这个替换操作是原子性操作。

Java中基于Unsafe类提供了对CAS的操作方法，JVM会帮我们实现对CAS的汇编指令。
注意CAS只是进行比较和交换，获取原值要靠自己实现。

‌优点‌：
‌高性能‌：由于不需要锁定机制，CAS操作通常具有较高的并发性能，避免用户态和内核态之间的切换。
‌无锁算法‌：适用于读多写少的场景，特别适合实现非阻塞算法和并发数据结构‌。

‌缺点‌：
‌循环开销‌：由于CAS操作失败后会重试，可能会导致线程长时间占用CPU资源。（自旋时间过长）
‌ABA问题‌：在某些情况下，内存位置的值可能由A变成B再变回A，CAS操作可能会误认为值没有变化而继续执行，导致错误更新‌。

如何解决自旋问题和ABA问题？
!!自旋问题：①由于自旋是重复试探能否CAS导致的，所以我们可以为其添加尝试次数。
②CAS执行一次失败后，将操作暂存，后面获取结果时，执行全部操作。!!
!!ABA问题：可以未内存值加上版本号，（A，1）->（B，2）->（A，3），此时CAS发现其不是第一版本的A，不执行。使用AtomicStampedReference，不但会判断原值，还会比较版本信息!!
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
核心类：ThreadPoolExecutor，在此基础上有很多包装类。
七大参数：
- int corePoolSize：核心线程数，当未达到该核心线程数时，将放入线程池的线程执行。
- BlockingQueue< Runnable > workQueue：当达到核心线程数时，将线程放入该阻塞队列。
- int maxiMumPoolSize：最大线程数，当阻塞队列满了，需要其他线程帮助（开启额外的线程），但是额外开启的线程数和核心线程数的和不能超过maxiMumPoolSize。
- TimeUnit unit:
- long keepAliveTime：要过多久时间来帮你回收完成任务的线程（额外开启的线程或核心线程）。
- ThreadFactory threadFactory：工厂。代表你怎么去创建线程，以及自定义创建线程的属性。
- RejectedExecutionHandler handler：一个接口，实现拒绝策略。当达到一定条件（比如核心线程数，阻塞队列，最大线程数都满了），执行定义的策略。
优点：
- 提高线程利用率
- 提高程序响应速度
- 便于统一管理对象
- 可以控制最大并发数

## TheadLocal
用于创建线程局部变量，其实现依赖于Thread类中的一个ThreadLocalMap字段，这是一个ThreadLocal变量本身和对应值的映射。每个线程都有自己的ThreadLocalMap实例，用于存储该线程所持有的所有Thread Local变量的值。
优点：
线程隔离：ThreadLocal为每个线程提供独立的变量副本，线程之间不会相互影响，不必担心数据竞争和线程同步。
降低耦合度：减少参数传递，使代码更加模块化。
性能优势：减少同步开销。

