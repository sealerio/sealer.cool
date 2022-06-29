# FAQ

本节旨在回答有关密封剂的最常见问题。并且会定期更新。

## sealer应用失败时如何手动清理主机环境。

在某些情况下，当您运行 sealer apply 失败，并且提示显示有点不够用时，本节将指导您如何手动清理主机。

当运行 kubeadm init 失败时，您可以按照以下清理步骤操作。

### 卸载rootfs或应用mount（如果存在）

```shell
df -h | grep sealer
overlay          40G  7.3G   31G  20% /var/lib/sealer/data/my-cluster/rootfs
```

卸载示例:

```shell
umount /var/lib/sealer/data/my-cluster/rootfs
```

## 删除rootfs目录（如果存在）

```shell
rm -rf /var/lib/sealer/data/my-cluster
```

## 删除Kubernetes目录（如果存在）

```shell
rm -rf /etc/kubernetes
rm -rf /etc/cni
rm -rf /opt/cni
```

## 删除docker registry（如果存在）

```shell
docker ps
docker rm -f -v sealer-registry
```

如果您的集群已启动，您可以按照以下清理步骤进行操作。

## kubeadm reset

```shell
kubeadm reset -f
```

## 删除kube config和 kubelet（如果存在）

```shell
rm -rf $HOME/.kube/config
rm -rf ~/.kube/ && rm -rf /etc/kubernetes/ && \
rm -rf /etc/systemd/system/kubelet.service.d && rm -rf /etc/systemd/system/kubelet.service && \
rm -rf /usr/bin/kube* && rm -rf /usr/bin/crictl && \
rm -rf /etc/cni && rm -rf /opt/cni && \
rm -rf /var/lib/etcd && rm -rf /var/etcd
```