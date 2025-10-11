---
icon: pen-to-square
date: 2025-09-29
category:
    - BiliBli网课
tag:
    - Docker
---
# Docker
## 基本概念
Docker主要还是运行在Linux系统上，实现程序容器化管理。这里的镜像中没有OS内核，更加轻量。
- 镜像，可以理解为一个安装包或者Java中的类，用来生成容器
- 容器，可以理解为镜像的一个运行实例
镜像和容器都有各自的id
除此之外，Docker的network网络也比较重要，主要有两种模式：bridge桥接模式，每个容器都有自己的ip与宿主机ip不互通，在此基础上可以建立子网。另一种为host主机模式，共用主机ip。
## 命令
docker pull 镜像源（不加默认为官方docker.io）/dockerhub作者名/docker容器名称:版本号（tag）： 用于拉取镜像
docker run 镜像id：创建并启动容器，其实可以先不用pull，启动时如果没有从本地找到的话，会自动拉取并启动。加上 -d 会分离运行，加上 -name xxx，会将容器名字命名为xxxx，加上 -p 对外（宿主机）端口:对内（容器内）端口，可以指定端口映射。可以使用 -v 宿主机目录:容器内目录，创建挂载卷映射，也就是说这份文件在宿主机和容器里面都存在一份文件，修改随便一份，另一份会同步，删除容器，宿主机的文件不会消失
docker start 容器id（或者名称）：只是对容器进行启动，而不是向run命令一样总是创建容器
docker stop 容器id（或者名称）：停止容器
docker rmi 镜像id（或者名称）：删除镜像
docker rm 容器id（名称）：删除容器，要注意，如果容器正在运行，需要加上-f强制删除
docker ps：显示运行中的容器，加上-a可以查看所有容器
docker build -t 镜像名字:tag版本号 构建目录（.表时当前目录构建）：需要有Dockerfile文件
