---
icon: pen-to-square
date: 2026-01-07
category:
  - 项目管理
tag:
  - maven
---
# Maven 核心配置全解析手册

本手册详细解析了 Maven 的两大核心配置文件：全局配置 `settings.xml` 与项目配置 `pom.xml`。通过对每个标签的深度拆解，帮助你掌握 Java 项目管理的核心逻辑。

---

## 一、 Maven 全局管家：settings.xml

`settings.xml` 定义了 Maven 的运行环境和资源获取路径。它通常存放在 `${MAVEN_HOME}/conf/settings.xml`（全局）或 `~/.m2/settings.xml`（用户级）。

### 1. <localRepository> (本地仓库)
* **作用**：定义 Maven 下载的所有构件（Jar 包）在本地磁盘的存储位置。
* **应用**：建议修改默认路径，避免占用系统盘空间。
* **示例**：
    ```xml
    <localRepository>D:/maven_repository</localRepository>
    ```

### 2. <mirrors> (镜像配置)
* **作用**：将对指定仓库（如中央仓库）的请求重定向到国内镜像站，极大提升下载速度。
* **应用**：中国开发者必配阿里云镜像。
* **示例**：
    ```xml
    <mirrors>
      <mirror>
        <id>aliyunmaven</id>
        <mirrorOf>central</mirrorOf> <name>阿里云公共仓库</name>
        <url>[https://maven.aliyun.com/repository/public](https://maven.aliyun.com/repository/public)</url>
      </mirror>
    </mirrors>
    ```

### 3. <servers> (服务器认证)
* **作用**：存储访问远程私有仓库（如 Nexus）的权限信息。
* **应用**：发布项目到私服时，需配置对应的账号密码。
* **示例**：
    ```xml
    <servers>
      <server>
        <id>my-company-repo</id> <username>admin</username>
        <password>password123</password>
      </server>
    </servers>
    ```

### 4. <profiles> (全局配置集)
* **作用**：定义全局属性或插件配置，可根据环境自动激活。
* **示例**：
    ```xml
    <profiles>
      <profile>
        <id>jdk-11</id>
        <activation>
          <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
          <maven.compiler.source>11</maven.compiler.source>
          <maven.compiler.target>11</maven.compiler.target>
        </properties>
      </profile>
    </profiles>
    ```

---

## 二、 Maven 项目蓝图：pom.xml

`pom.xml` (Project Object Model) 是项目的核心，决定了项目的身份、依赖及构建方式。



### 1. 项目坐标 (GAV)
* **作用**：唯一标识一个项目。
* **示例**：
    ```xml
    <groupId>com.example.module</groupId> <artifactId>demo-service</artifactId> <version>1.0.0-SNAPSHOT</version>    <packaging>jar</packaging>            ```

### 2. <parent> (继承)
* **作用**：引入父项目的配置，简化子项目的配置工作。
* **示例**：
    ```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.5</version>
        <relativePath/> </parent>
    ```

### 3. <properties> (属性定义)
* **作用**：定义常量变量，方便统一管理版本号。
* **示例**：
    ```xml
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <mybatis.version>3.5.10</mybatis.version>
    </properties>
    ```

### 4. <dependencies> (依赖列表)
* **作用**：声明项目运行所需的第三方库。
* **关键子标签 <scope>**：
    * `compile`: 默认，全阶段有效。
    * `test`: 仅测试代码有效。
    * `provided`: 编译有效，运行时由环境（如 Tomcat）提供。
* **示例**：
    ```xml
    <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>${mybatis.version}</version>
            <scope>compile</scope>
        </dependency>
    </dependencies>
    ```

### 5. <dependencyManagement> (依赖版本管理)
* **作用**：在父工程中统一声明版本，不实际引入。子模块引用时省略版本号，确保版本一致。
* **示例**：
    ```xml
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>1.2.11</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
    ```

### 6. <build> (构建配置)
* **作用**：配置编译插件、资源过滤及打包后的文件名。
* **示例**：
    ```xml
    <build>
        <finalName>my-application</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
    ```

### 7. <modules> (多模块聚合)
* **作用**：在聚合父工程中列出所有子模块，实现一键构建。
* **示例**：
    ```xml
    <modules>
        <module>common-utils</module>
        <module>core-business</module>
        <module>web-api</module>
    </modules>
    ```

---

## 三、 Maven 生命周期常用命令



| 命令 | 描述 |
| :--- | :--- |
| `mvn clean` | 删除 `target` 目录（清理旧的编译文件）。 |
| `mvn compile` | 编译源代码。 |
| `mvn test` | 运行单元测试。 |
| `mvn package` | 将项目打包成 Jar 或 War。 |
| `mvn install` | 将打好的包安装到本地仓库。 |
| `mvn deploy` | 将包上传到公司远程私库。 |

---