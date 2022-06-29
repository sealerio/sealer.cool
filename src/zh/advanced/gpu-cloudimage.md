# GPU集群镜像

## 准备

1. 在您的主机上安装nvidia驱动程序。
2. 在您的主机上安装最新版本的sealer。

## 如何构建它

我们在官方注册表中提供GPU基础镜像
名字 `registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes-nvidia:v1.19.8`。
你可以直接使用它。同时，我们在应用程序目录中提供构建上下文，它可以根据您的要求进行调整。

运行下面的命令来重建它。

`sealer build -f Kubefile -t registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes-nvidia:v1.19.8 -m lite .`

## 如何应用它

1. 根据你的基础环境修改Clusterfile，这里以Clusterfile为例。

```yaml
apiVersion: sealer.cloud/v2
kind: Cluster
metadata:
  name: default-kubernetes-cluster
spec:
  image: registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes-nvidia:v1.19.8
  ssh:
    passwd: xxx
  hosts:
    - ips: [ 192.168.0.2,192.168.0.3,192.168.0.4 ]
      roles: [ master ]
    - ips: [ 192.168.0.5 ]
      roles: [ node ]
```

2. 运行命令 `sealer apply -f Clusterfile` 应用GPU集群，这将需要几分钟。

## 如何检查结果

1. 检查要运行的 pod 状态`kubectl get pods -n kube-system nvidia-device-plugin`, 你可以在Running中找到pod状态
2. 获取要运行的节点详细信息`kubectl describe node`, if `nvidia.com/gpu`在“分配的资源”部分显示，您将获得一个带有GPU的k8s集群。
