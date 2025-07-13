---
icon: pen-to-square
date: 2025-07-11
category:
  - BiliBli网课
tag:
  - 黑马
  - 消息队列
  - RabbitMQ
---

# 消息队列 - RabbitMQ

## 优势

::: tip 优点总结
- 耦合度低，扩展性强
- 异步调用，无需等待，性能好
- 故障隔离
- 缓存消息，流量削峰
:::

## 设计原则

- 对于对方的执行结果不关心（执行成功也好失败也好对整个业务没有太大影响）
- 调用链串行变并行，提高速率

## 技术选型

::: tabs#mq
@tab RabbitMQ
- 基于 AMQP 协议
- 社区活跃，生态成熟
- 支持多种交换机类型，灵活性强

@tab Kafka
- 高吞吐量，适用于大数据日志
- 顺序性强，分区处理
- 更偏流处理而非任务队列

@tab RocketMQ
- 支持事务消息
- 延迟消息友好
- 阿里主推产品，国产优势

@tab ActiveMQ
- 功能全面
- 老牌项目，文档齐全
- 对比其他方案活跃度略低
:::

---

## RabbitMQ

### 安装与登录

- 请前往 CSDN 或官方文档查看安装细节
- 默认管理页面端口：`15672`
- 默认账号密码：`guest / guest`

### 核心架构与术语

| 术语        | 说明                 |
|-------------|----------------------|
| Publisher   | 消息发送者           |
| Consumer    | 消息消费者           |
| Queue       | 消息队列             |
| Exchange    | 交换机，用于路由消息 |

生产者将消息发送给交换机，交换机按照配置将消息路由至一个或多个队列。消费者监听指定队列并进行消费。

VirtualHost 用于服务之间隔离，防止队列冲突。

![架构图](https://i.imgs.ovh/2025/07/11/86u3r.png)

可通过 Web 控制台进行用户、队列、交换机的管理与绑定。

---

## Spring AMQP

Spring AMQP 是对 AMQP 协议的封装，提供标准化 API。主要包含两部分：

- `spring-amqp`：基础抽象层
- `spring-rabbit`：基于 RabbitMQ 的默认实现

### 消费逻辑说明

默认行为：一个队列绑定多个消费者时，会**轮询分发**消息，一个消费者一条，不考虑处理能力。

优化方式：

```yaml
spring:
  rabbitmq:
    listener:
      simple:
        prefetch: 1
```

设置 prefetch=1，确保同一时刻最多向每个消费者投递一条消息。

---

## 交换机类型

### Fanout 交换机（广播）

::: info
将消息广播给所有绑定的队列，不区分 RoutingKey。
:::

### Direct 交换机（定向路由）

- Queue 与 Exchange 设置 BindingKey
- Publisher 指定 RoutingKey
- Exchange 将消息投递到 BindingKey 匹配的队列

**默认类型即为 Direct。**

### Topic 交换机（通配符匹配）

RoutingKey 支持多单词组合（以 `.` 分隔）

- `*`：匹配一个单词
- `#`：匹配 0 或多个单词

示例：

```text
log.*    → 匹配 log.info、log.warn
log.#    → 匹配 log.db.error、log.db.conn
```

---

## 队列与交换机声明方式

### 配置类方式

使用 Java 配置类创建：

```java
@Configuration
public class RabbitConfig {

  @Bean
  public Queue exampleQueue() {
    return QueueBuilder.durable("example.queue").build();
  }

  @Bean
  public Exchange exampleExchange() {
    return ExchangeBuilder.directExchange("example.exchange").durable(true).build();
  }

  @Bean
  public Binding exampleBinding() {
    return BindingBuilder.bind(exampleQueue()).to(exampleExchange()).with("route.key").noargs();
  }
}
```

### 注解方式

使用 `@RabbitListener` 声明监听队列：

```java
@RabbitListener(queues = "example.queue")
public void receive(String message) {
  System.out.println("收到消息: " + message);
}
```

---

## 消息转换器

Java 对象发送到消息队列时需序列化。推荐使用 Jackson 进行 JSON 转换：

### 引入依赖

```xml
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
</dependency>
```

### 配置类中定义转换器

```java
@Bean
public MessageConverter jsonMessageConverter() {
  return new Jackson2JsonMessageConverter();
}
```

---

## 总结

- RabbitMQ 适合中等吞吐量场景，功能强、社区成熟
- 推荐使用 Spring AMQP 自动声明队列与交换机，简化配置
- 根据业务场景合理选择交换机类型
- 建议引入消息转换器保障消息格式一致性
