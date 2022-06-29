# 什么是ClusterRootfs

运行 kubernetes 集群所需的所有文件。

包含:

* Bin 文件, like docker containerd crictl kubeadm kubectl...
* Config 文件, like kubelet systemd config, docker systemd config, docker daemon.json...
* Registry docker image
* 一些元数据, 像 Kubernetes 版本。
* Registry 文件, 包含所有的docker镜像，比如kubernetes核心组件docker镜像...
* Scripts, 一些用于安装docker和kubelet的shell脚本... sealer将调用init.sh和clean.sh。
* 其他静态文件

```yaml
.
├── bin
│   ├── conntrack
│   ├── containerd-rootless-setuptool.sh
│   ├── containerd-rootless.sh
│   ├── crictl
│   ├── kubeadm
│   ├── kubectl
│   ├── kubelet
│   ├── nerdctl
│   └── seautil
├── cri
│   ├── containerd
│   ├── containerd-shim
│   ├── containerd-shim-runc-v2
│   ├── ctr
│   ├── docker
│   ├── dockerd
│   ├── docker-init
│   ├── docker-proxy
│   ├── rootlesskit
│   ├── rootlesskit-docker-proxy
│   ├── runc
│   └── vpnkit
├── etc
│   ├── 10-kubeadm.conf
│   ├── Clusterfile  # 镜像默认集群文件
│   ├── daemon.json
│   ├── docker.service
│   ├── kubeadm-config.yaml
│   └── kubelet.service
├── images
│   └── registry.tar  # registry docker 镜像，将加载此镜像并在集群中运行本地registry
├── Kubefile
├── Metadata
├── README.md
├── registry # 将此目录挂载到本地registry
│   └── docker
│       └── registry
├── scripts
│   ├── clean.sh
│   ├── docker.sh
│   ├── init-kube.sh
│   ├── init-registry.sh
│   ├── init.sh
│   └── kubelet-pre-start.sh
└── statics # yaml文件, sealer将渲染这些文件的值
    └── audit-policy.yml
```

## 如何获取 ClusterRootfs

1. 拉取一个基础镜像 `sealer pull kubernetes:v1.19.8-alpine`
2. 查看镜像层信息 `sealer inspect kubernetes:v1.19.8-alpine`
3. 进入基础镜像层 `ls /var/lib/sealer/data/overlay2/{layer-id}`

您将找到ClusterRootfs层。

## 自定义构建BaseImage

您可以在ClusterRootfs中编辑您想要的任何文件，例如您想定义自己的 docker daemon.json，只需编辑它并构建一个新的ClusterImage。

```shell script
FROM scratch
COPY . .
```

```shell script
sealer build -t user-defined-kubernetes:v1.19.8 .
```

然后，您可以将此镜像像用作基础镜像。

## 覆盖ClusterRootfs文件

有时您不想关心ClusterRootfs上下文，但需要自定义一些配置。

您可以使用`kubernetes:v1.19.8`作为基础镜像，并使用自己的配置文件覆盖CloudRootfs中的默认文件。

例如：daemon.json是您的docker引擎配置，使用它来覆盖默认配置：

```shell script
FROM kubernetes:v1.19.8
COPY daemon.json etc/
```

```shell script
sealer build -t user-defined-kubernetes:v1.19.8 .
```