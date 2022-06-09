# Quick start

## Install a kubernetes cluster

```shell script
# install Sealer binaries
wget https://github.com/sealerio/sealer/releases/download/v0.8.5/sealer-v0.8.5-linux-amd64.tar.gz && \
tar zxvf sealer-v0.8.5-linux-amd64.tar.gz && mv sealer /usr/bin
# run a kubernetes cluster
sealer run kubernetes:v1.19.8 \
  --masters 192.168.0.2,192.168.0.3,192.168.0.4 \
  --nodes 192.168.0.5,192.168.0.6,192.168.0.7 --passwd xxx
```

```shell script
[root@iZm5e42unzb79kod55hehvZ ~]# kubectl get node
NAME                    STATUS ROLES AGE VERSION
izm5e42unzb79kod55hehvz Ready master 18h v1.19.8
izm5ehdjw3kru84f0kq7r7z Ready master 18h v1.19.8
izm5ehdjw3kru84f0kq7r8z Ready master 18h v1.19.8
izm5ehdjw3kru84f0kq7r9z Ready <none> 18h v1.19.8
izm5ehdjw3kru84f0kq7raz Ready <none> 18h v1.19.8
izm5ehdjw3kru84f0kq7rbz Ready <none> 18h v1.19.8
```

## Clean the cluster

Some information of the basic settings will be written to the Clusterfile and stored in /root/.sealer/[cluster-name]/Clusterfile.

```shell script
sealer delete -f /root/.sealer/my-cluster/Clusterfile
```

## Build your own ClusterImage

For example, build a dashboard ClusterImage:

Kubefile:

```shell script
# base ClusterImage contains all the files that run a kubernetes cluster needed.
#    1. kubernetes components like kubectl kubeadm kubelet and apiserver images ...
#    2. docker engine, and a private registry
#    3. config files, yaml, static files, scripts ...
FROM registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8
# download kubernetes dashboard yaml file
RUN wget https://raw.githubusercontent.com/kubernetes/dashboard/v2.2.0/aio/deploy/recommended.yaml
# when run this ClusterImage, will apply a dashboard manifests
CMD kubectl apply -f recommended.yaml
```

Build dashboard ClusterImage:

```shell script
sealer build -t registry.cn-qingdao.aliyuncs.com/sealer-io/dashboard:latest .
```

Run your kubernetes cluster with dashboard:

```shell script
# sealer will install a kubernetes on host 192.168.0.2 then apply the dashboard manifests
sealer run registry.cn-qingdao.aliyuncs.com/sealer-io/dashboard:latest --masters 192.168.0.2 --passwd xxx
# check the pod
kubectl get pod -A|grep dashboard
```

## Push the ClusterImage to the registry

```shell script
# you can push the ClusterImage to docker hub, Ali ACR, or Harbor
sealer push registry.cn-qingdao.aliyuncs.com/sealer-io/dashboard:latest
```