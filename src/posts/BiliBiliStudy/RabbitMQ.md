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
# 消息队列-RabbitMQ
# 优势
- 耦合度低，扩展性强
- 异步调用，无需等待，性能好
- 故障隔离
- 缓存消息，流量削峰
# 设计原则
- 对于对方的执行结果不关心（执行成功也好失败也好对整个业务没有太大影响）
- 调用链串行变并行，提高速率
# 技术选型
broker最常见实现方案：MQ（MessageQUeue 消息队列）
RabbitMQ、ActiveMQ、RocketMQ、Kafka之间的区别
# RabbitMQ
## 下载安装自己去CSDN找教程吧
## 管理页面
默认端口：15672；默认用户名密码：guest guest
### 整体架构和核心概念
- publisher：消息发送者
- consumer：消息的消费者
- queue：队列，存储消息
- exchange；交换机，负责路由消息
生产者将消息发送给交换机，交换机按照配置将消息发给消息队列（1对1或者1对n），消费者监听特定的消息队列并消费消息
交换机和消息队列就是RabbitMQ提供的中间服务，即对Broker的实现；RabbitMQ的吞吐量在十万左右，但是实际一个服务QPS可能达不到，这样我们可以多个服务共用一个RabbitMQ，这样的话要将各个服务隔离开。VirtualHost就起到一个隔离作用。
模型架构图：
[![86u3r.png](https://i.imgs.ovh/2025/07/11/86u3r.png)](https://imgloc.com/image/86u3r)
要在管理页面对交换机和队列做绑定
可以在Admin界面管理用户、虚拟机隔离等等
## Spring AMQP（Advanced Message Queue Protocol）
用于在应用程序之间传递业务消息的开放标准。该协议与语言和平台无关，更符合微服务中独立性的要求。
Spring AMQP是对AMQP定义的一套API规范，提供了模板来发送和接收消息。包含两部分，其中spring-amqp是基础抽象，spring-rabbit是底层的默认实现。
默认情况下一个队列绑定了多个消费者，会轮询，一个消费者一条消息，不会考虑每个消费者的处理能力。这样不会考虑消费者是否处理完消息，可能会出现消息堆积。可以修改配置，把prefetch改为1，确保同一时刻最多投递给消费者一条消息
## 交换机
### Fanout交换机：广播
将接收到的消息广播到每一个跟其绑定的queue
### Direct交换机：定向
它会将接收到的消息，根据规则路由到指定的Queue，因此称为定向路由。
每一个Queue都和Exchange设置一个BindingKey
发布者发布消息时，指定消息的RoutingKey
Exchange将消息路由到BindingKey与消息RoutingKey一致的队列
多个队列可以绑定相同的BindingKey，这样的话对应RoutingKey的消息会被发到这多个队列
*默认就是Direct*
### Topic交换机
Topic交换机和Direct交换机类似，区别在于routingKey可以是多个单词的列表，并且以“.”分割。
Queue与Exchange指定BindingKey时可以使用通配符：
- `#`：代表0个或者多个单词（其实Direct，也能绑定多个，但是都要单独绑定麻烦）
- `*`：代指一个单词
## 声明队列交换机
在控制台声明交换机十分繁琐，切换开发、测试、运维等环境时还容易出错；我们应当通过java代码声明创建
Spring AMQP提供了几个类，用来声明队列、交换机及其绑定关系：
- Queue：用于声明队列，可以用工厂类QueueBuilder构建
- Exchange：用于声明交换机，可以用工厂类ExchangeBuilder构建
- Binding：用于声明队列和交换机的绑定关系，可以用工厂类BindingBuilder构建
### 配置类声明@Configuration+@Bean
### 基于@RabbitListener注解来声明队列和交换机
## 消息转换器
java对象发送到消息队列中会被序列化成一串，所以我们要用消息转换器。
引入jackson依赖，使用配置类中使用@Bean  Jackson2JasonMessageConverter