# Kubefile指令

`Kubefile`是一个文本文档，其中包含用户可以在命令行上调用以组装映像的所有命令。我们可以使用 `Kubefile` 定义可以离线共享和部署的集群映像。
一个 `Kubefile` 就像 `Dockerfile` 一样，它包含定义特定集群的构建指令。

## FROM指令

`FROM` 指令定义了你想要引用的基础镜像，并且 Kubefile 中的第一条指令必须是 FROM 指令。
如果基础镜像是私有镜像，则需要registry认证信息。并且，Sealer社区提供了官方基础镜像。

> command format：FROM {your base image name}

用法：

例如，使用Sealer社区提供的基础镜像 `kubernetes:v1.19.8` 构建新的集群镜像。

`FROM registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8`

## COPY指令

`COPY` 指令用于将文件或目录等上下文路径中的内容复制到 `rootfs`。
所有的云镜像都是基于[rootfs](....apicloudrootfs.md)，默认src路径是`rootfs`。
如果指定的目标目录不存在，sealer会自动创建。

> 命令格式：COPY {src dest}

用法：

例如, copy `mysql.yaml`to`rootfs/mysql.yaml`

`COPY mysql.yaml .`

例如, 将目录“apollo”复制到`rootfs/charts/apollo`

`COPY apollo charts`

## RUN指令

RUN指令将在当前图像之上的新层中执行任何命令并提交结果。
生成的提交图像将用于“Kubefile”中的下一步。

> 命令格式：RUN {command args ...}

用法：

例如,使用 `RUN` 指令执行下载 kubernetes dashboard。

`RUN wget https://raw.githubusercontent.com/kubernetes/dashboard/v2.2.0/aio/deploy/recommended.yaml`

### CMD指令

CMD指令的格式与RUN指令类似，也会在新的一层执行任何命令。但是，CMD命令会在集群启动时执行。
它通常用于启动应用程序或配置集群。与`Dockerfile` CMD不同，如果在`Kubefile`中列出多个CMD，则所有CMD都会生效。

> 命令格式：CMD {command args ...}

用法：

例如,使用 `CMD` 指令执行应用kubernetes dashboard yaml的命令。

`CMD kubectl apply -f recommended.yaml`
