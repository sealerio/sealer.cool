# Quick start

This guide covers how you can quickly get started using Sealer.

## PREREQUISITES for kubernetes

1. Install the sealer locally.
2. Prepare six hosts and record their IPs and passwords, the following conditions are recommended:
   1. Hardware: 4C8G + 50G(System Disk)
   2. OS: CentOS/RHEL 7.5、CentOS/RHEL 7.6、CentOS/RHEL 7.7、CentOS/RHEL 7.8、CentOS/RHEL 7.9
   3. Kernel: 4.18.*（Recommend）、4.19.* 、 3.10.*（>=3.10.0-1160）

## Install a kubernetes cluster

```shell
# run a kubernetes cluster
sealer run docker.io/sealerio/kubernetes:v1.22.15 \
  --masters 192.168.0.2,192.168.0.3,192.168.0.4 \
  --nodes 192.168.0.5,192.168.0.6,192.168.0.7 --passwd xxx
```

```shell
[root@iZm5e42unzb79kod55hehvZ ~]# kubectl get node
NAME                    STATUS ROLES AGE VERSION
izm5e42unzb79kod55hehvz Ready master 18h v1.22.15
izm5ehdjw3kru84f0kq7r7z Ready master 18h v1.22.15
izm5ehdjw3kru84f0kq7r8z Ready master 18h v1.22.15
izm5ehdjw3kru84f0kq7r9z Ready <none> 18h v1.22.15
izm5ehdjw3kru84f0kq7raz Ready <none> 18h v1.22.15
izm5ehdjw3kru84f0kq7rbz Ready <none> 18h v1.22.15
```

## PREREQUISITES for k0s

1. Install the sealer locally.
2. prepare four hosts and record their IPs and passwords, the condition you should refer [System-requirements](https://docs.k0sproject.io/v1.26.2+k0s.0/system-requirements/)

## Install a k0s cluster

```shell
sealer run docker.io/sealerio/k0s:v1-24-10-sealerio-1 \
  --masters 192.168.0.2 \
  --nodes 192.168.0.5,192.168.0.6,192.168.0.7 --passwd xxx
```

```shell
[root@iZm5e42unzb79kod55hehvZ ~]# kubectl get node
NAME                    STATUS ROLES AGE VERSION
izm5ehdjw3kru84f0kq7r9z Ready <none> 18h v1.24.10-k0s.0
izm5ehdjw3kru84f0kq7raz Ready <none> 18h v1.24.10-k0s.0
izm5ehdjw3kru84f0kq7rbz Ready <none> 18h v1.24.10-k0s.0
```

## Build an app image

nginx.yaml:

```shell
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      run: my-nginx
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
        - name: my-nginx
          image: nginx
          ports:
            - containerPort: 80
```

Kubefile:

```shell
FROM scratch
APP nginx local://nginx.yaml
LAUNCH ["nginx"]
```

```shell
sealer build -f Kubefile -t sealer-io/nginx:latest --type app-installer
```

## Run the app image

```shell
sealer run sealer-io/nginx:latest
# check the pod
kubectl get pod -A
```

## Push the app image to the registry

```shell
# you can push the app image to docker hub, Ali ACR, or Harbor
sealer tag sealer-io/nginx:latest {registryDomain}/sealer-io/nginx:latest
sealer push {registryDomain}/sealer-io/nginx:latest
```

## Clean the cluster

Some information of the basic settings will be written to the cluster and stored in /root/.sealer/Clusterfile locally.

```shell
sealer delete -a
```

## SEE ALSO

+ [Kubefile](../concept/kubefile.md)
+ [Sealer Image](../concept/sealer-image.md)
+ [Sealer Cluster Image List](../sealer-images/cluster-images.md)
