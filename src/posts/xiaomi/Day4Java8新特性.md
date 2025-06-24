---
icon: pen-to-square
date: 2025-06-19
category:
    - 小米训练营
tag:
    - Java
    - 1.8
    - 新特性
---
# Day4 Java8新特性
## 函数式编程
**优点**
简化代码，增强可读性
**特点**
- 纯函数
- 不可变性
- 高阶函数
- 声明式函数
- 递归
*新知识final和effective final：当定义的变量实际没有更改的时候，Java会在运行时隐式的将其改为final。*
**所有的函数式编程都是值传递，不是引用传递**
### 函数式编程（FunctionalInterface注解--函数式接口）
#### `Predicate<T>`
接受一个参数，返回一个布尔值；可以看作一个判断条件或者筛选器
#### `Consumer<T>`
接受一个参数，进行操作，不反悔任何值；一个执行某种操作的消费者，对传入的参数做一些处理和操作
#### `Function<T,R>`
接受一个参数，返回一个结果；一个转换器或者映射器，比如接受一个字符串，返回这个字符串长度


## Lambda表达式
增强可读性
[![pVVZItP.png](https://s21.ax1x.com/2025/06/19/pVVZItP.png)](https://imgse.com/i/pVVZItP)
[![pVVZxkq.png](https://s21.ax1x.com/2025/06/19/pVVZxkq.png)](https://imgse.com/i/pVVZxkq)
## StreamAPI
**Stream是值传递，不会改变原来的变量,所以不能用Stream代替全部**
对数据集和的一种高级抽象，用于以声明式的方式处理数据
语法糖
### 常用中间操作-filter
对元素进行过滤，接受的参数类型是 `Predicate<T>`，布尔值来判断过滤条件
### 常用中间操作-map
对元素进行转换，接受的参数类型是 `Function<T,R>`，有一个返回值作为转换后的元素
### 常用中间操作-flatMap
用于将一个Stream中的每个元素转换为一个新的Stream，然后将这些新的Stream扁平化合并为一个新的Stream
### 常用中间操作-sorted
```java
List<Student> studentList1 = List.of(new Student(8),new Student(5),new Student(20));
        List<Student> collectedStudent = studentList1.stream().sorted((x1,x2)->{
            if(x1.getGrade()>x2.getGrade()){
                return -1;
            }
            else if(x1.getGrade()<x2.getGrade()){
                return 1;
            }
            else{
                return 0;
            }
        }).toList();
```
### 常用终端操作-forEach
循环遍历
**重申：我们是值传递，不会改变原来的变量**
```java
List<String> testNames = Arrays.asList("Alice","Bob","Charlie");
        testNames.stream().forEach(name -> System.out.println(name));
```
### 常用终端操作-reduce
[![pVVlysf.png](https://s21.ax1x.com/2025/06/19/pVVlysf.png)](https://imgse.com/i/pVVlysf)
### 常用终端操作-collect
collect（收集）用于将Stream中的元素手机到一个新的集合中
#### Collectors.partitioningBy
不常用。根据条件将元素分组，主键是Boolean
#### Collectors.groupingBy
常用场景：用空间复杂度换时间复杂度
返回一个`Map<K,List<T>>`,其中K是分组的键，可以是任意类型，由指定的分组函数决定。
### ForEach和ForEachOrder
并行流中ForEach不保证顺序，ForEachOrder保证顺序
### peek
[![pVV3ABT.png](https://s21.ax1x.com/2025/06/19/pVV3ABT.png)](https://imgse.com/i/pVV3ABT)
## Optional类和新的日期时间API
### Optional类
明确地处理空值，在许多Java代码中，控制的处理常常导致NullPointerExceotion。通过使用Optional，可以更明确地表示一个值可能为空，促使开发者更有意识地处理可能的空情况，从而减少运行时的空指针异常。
[![pVV3kuV.png](https://s21.ax1x.com/2025/06/19/pVV3kuV.png)](https://imgse.com/i/pVV3kuV)
[![pVV3YUe.png](https://s21.ax1x.com/2025/06/19/pVV3YUe.png)](https://imgse.com/i/pVV3YUe)
### 新的日期时间API
#### 传统时间处理的问题
- Date类同时表示日期和时间，不够清晰
- Calendar 类的线程不安全
- 格式化和解析困难
[![pVVGfBV.png](https://s21.ax1x.com/2025/06/19/pVVGfBV.png)](https://imgse.com/i/pVVGfBV)
#### 新的日期时间API
[![pVVG5AU.png](https://s21.ax1x.com/2025/06/19/pVVG5AU.png)](https://imgse.com/i/pVVG5AU)
[![pVVGH39.png](https://s21.ax1x.com/2025/06/19/pVVGH39.png)](https://imgse.com/i/pVVGH39)
[![pVVG79J.png](https://s21.ax1x.com/2025/06/19/pVVG79J.png)](https://imgse.com/i/pVVG79J)
[![pVVGjHK.png](https://s21.ax1x.com/2025/06/19/pVVGjHK.png)](https://imgse.com/i/pVVGjHK)


## 其他知识
### `new` 与 `.of()` 的区别对比表

| 特性             | `new`                   | `.of()`                                |
|------------------|-------------------------|----------------------------------------|
| 可变性           | 可变（Mutable）         | 不可变（Immutable）                   |
| 可接受 null      | ✅ 可以                 | ❌ 不可以                              |
| Java 版本        | 所有版本                | Java 9+（部分 IDE 可回溯到 Java 8）   |
| 用途             | 自定义、修改集合        | 快速定义只读集合                       |
| 示例             | `new ArrayList<>()`     | `List.of("a", "b")`                    |

### 🎯 哪个该用？

| 场景                 | 推荐使用       |
|----------------------|----------------|
| 临时只读小集合       | `.of()`        |
| 需要添加或修改元素   | `new`          |
| 兼容旧版 Java        | `new`          |
| 创建对象（非集合）   | `new`（必须）  |


