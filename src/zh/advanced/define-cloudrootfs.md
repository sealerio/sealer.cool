# 自定义ClusterRootfs

运行kubernetes集群需要的所有文件。

包含:

* Bin文件, 如docker, containerd, crictl ,kubeadm, kubectl...
* Config 文件, 如kubelet systemd config, docker systemd config, docker daemon.json...
* Registry docker image.
* 一些元数据，例如 Kubernetes 版本。
* Registry 文件, 包含所有的docker镜像，比如kubernetes核心组件docker镜像...
* Scripts, 一些用于安装 docker 和 kubelet 的 shell 脚本... sealer 将调用 init.sh 和 clean.sh。
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
│   └── registry.tar  # registry docker 镜像，将加载此镜像并在集群中运行本地的registry
├── Kubefile
├── Metadata
├── README.md
├── registry # 将此目录挂载到本地的registry
│   └── docker
│       └── registry
├── scripts
│   ├── clean.sh
│   ├── docker.sh
│   ├── init-kube.sh
│   ├── init-registry.sh
│   ├── init.sh
│   └── kubelet-pre-start.sh
└── statics # yaml文件, sealer将在这些文件中渲染值
    └── audit-policy.yml
```

## 如何获取ClusterRootfs

1. 拉取一个基础镜像 `sealer pull kubernetes:v1.19.8-alpine`
2. 查看镜像层信息 `sealer inspect kubernetes:v1.19.8-alpine`
3. 进入基础镜像层 `ls /var/lib/sealer/data/overlay2/{layer-id}`

您将找到ClusterRootfs层。

## 构建自己的基础镜像

您可以在ClusterRootfs中编辑您想要的任何文件，例如您想定义自己的docker daemon.json，只需编辑它并构建一个新的 ClusterImage。

```shell script
FROM scratch
COPY . .
```

```shell script
sealer build -t user-defined-kubernetes:v1.19.8 .
```

然后，您可以将此镜像用作基础镜像。

## 覆盖ClusterRootfs文件

有时您不想关心ClusterRootfs上下文，但需要自定义一些配置。

你可以使用`kubernetes:v1.19.8`作为基础镜像, 并使用您自己的配置文件覆盖ClusterRootfs中的默认文件。

例如：daemon.json 是您的docker引擎配置，使用它来覆盖默认配置：

```shell script
FROM kubernetes:v1.19.8
COPY daemon.json etc/
```

```shell script
sealer build -t user-defined-kubernetes:v1.19.8 .
```
