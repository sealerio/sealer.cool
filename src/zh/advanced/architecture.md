# 体系结构

![](https://user-images.githubusercontent.com/8912557/133879086-f13e3e37-65c3-43e2-977c-e8ebf8c8fb34.png)

Sealer 有两个顶级模块：Build Engine和Apply Engine

Build Engine使用Kubefile和构建上下文作为输入，并构建一个包含所有依赖项的ClusterImage。
Apply Engine使用Clusterfile来初始化包含kubernetes和其他应用程序的集群。

## Build Engine

* Parser : 将Kubefile解析为镜像元数据
* Registry : 推送或拉取 ClusterImage
* Store : 将ClusterImage保存到本地磁盘

### 构建方式

* Lite Builder，sealer将检查所有清单或helm chart，解码这些文件中的docker镜像，并将它们缓存到 ClusterImage 中。
* Cloud Builder，sealer将使用公共云创建一个集群，并执行Kubefile中定义的RUN & CMD命令，然后将所有docker镜像缓存在集群中。
* Container Builder，以Docker容器为节点，在容器中运行kubernetes集群，然后缓存所有的docker镜像。

## Apply Engine

* Infra : 管理基础架构，例如在公共云中创建虚拟机，然后在其上应用集群。或者使用docker仿真节点。
* Runtime : 集群安装程序实现，例如使用kubeadm安装集群。
* Config : 应用程序配置，如mysql用户名密码或其他配置，您可以使用Config覆盖您想要的任何文件。
* Plugin : 插件帮助我们做一些额外的工作，比如在安装之前执行一个shell命令，或者在安装之后给一个节点添加一个标签。
* Debug : 帮助我们检查集群是否健康，当出现意外时找到原因。

## 其他模块

* Filesystem : 将ClusterRootfs文件复制到所有节点
* Mount : 将ClusterImage所有层安装在一起
* Checker : 做一些事前检查和事后检查
* Command : 一个命令代理来执行一些操作系统没有命令的任务。像ipvs或证书管理器。
* Guest : 管理用户应用层，如Kubefile中定义的exec CMD命令。
