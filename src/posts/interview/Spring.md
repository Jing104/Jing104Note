---
icon: pen-to-square
date: 2025-04-29
category:
  - 八股
tag:
  - Spring
  - SpringBoot
---
# Spring
## 配置类的理解学习
| 特性/维度             | 配置类中的 `@Bean` 方法                             | 配置类实现配置接口                           | 普通类                              |
|----------------------|----------------------------------------------------|---------------------------------------------|-------------------------------------|
| 所属类               | 配置类（`@Configuration`）                         | 配置类（`@Configuration`）或 `@Component` 类 | 任意普通类                         |
| 注册到容器方式       | 使用 `@Bean` 注解自动注册                          | Spring 自动调用接口方法配置注册             | 需加 `@Component` 等注解手动注册   |
| 方法是否自动调用     | ✅ 会在启动时自动执行一次                           | ✅ 实现接口的方法在启动时自动回调           | ❌ 不会自动调用，除非主动调用      |
| 是否可参与依赖注入   | ✅ 返回值会成为 Spring 容器中的 Bean                | 一般不返回 Bean，但影响 Bean 的配置         | 可以注入，但本身不会参与配置流程   |
| 典型用途             | 注册服务、工具类、第三方组件等                     | 配置框架功能（如 WebSocket、MVC、Security） | 实体类、Service、工具类等         |
| 使用示例             | `@Bean public DataSource ds() {...}`              | `implements WebSocketMessageBrokerConfigurer` | `public class User {...}`         |
| 生命周期控制         | ✅ 受 Spring 管理（单例/多例）                     | 间接影响生命周期，如注册拦截器、端点         | ❌ 不自动受控，需额外注解或配置     |
| 依赖注入能力         | ✅ 支持构造注入、字段注入、方法注入                | ✅ 通常通过字段/构造注入                     | ✅ 但需标记为 Bean 或被容器管理     |
| Spring 生命周期钩子   | ❌ 通常不用于生命周期钩子                           | ✅ 可作为配置钩子（初始化阶段生效）          | ❌ 除非手动触发生命周期相关方法     |


配置类中Bean对象的id：
| 写法方式                                 | Bean ID（名称）     |
|------------------------------------------|---------------------|
| `@Bean public MyService myService()`     | `myService`（默认） |
| `@Bean("customService")`                 | `customService`     |
| `@Bean(name = "svc")`                    | `svc`               |
| `@Bean(value = "myBean")`                | `myBean`            |
| `@Bean({"alias1", "alias2"})`            | `alias1`, `alias2`（别名） |
