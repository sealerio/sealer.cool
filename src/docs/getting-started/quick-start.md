# Quick start

This guide covers how you can quickly get started using Sealer.

## Prerequisites

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
:::tip Password reminder
The password cannot contain the `$` environment variable character, as [cobra](https://github.com/spf13/cobra/) cannot recognize it. You can run Sealer using one of the following methods: user `\$`、 `'1234$a'` OR `"1234\$a"`
:::

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

## Build an app image

To build an app image, start by creating a nginx.yaml file with the following content:

```yaml
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

Next, create a `Kubefile` with the following content:

```shell
FROM scratch
APP nginx local://nginx.yaml
LAUNCH ["nginx"]
```

Finally, run the following command to build the app image:

```shell
sealer build -f Kubefile -t sealer-io/nginx:latest --type app-installer
```

## Run the app image

To run the app image, use the following command:

```bash
sealer run sealer-io/nginx:latest
```

You can check the pod by running the following command:

```bash
kubectl get pod -A
```

## Push the app image to the registry

To push the app image to the registry, use the following command:

```bash
sealer tag sealer-io/nginx:latest {registryDomain}/sealer-io/nginx:latest
sealer push {registryDomain}/sealer-io/nginx:latest
```

You can push the app image to Docker Hub, Ali ACR, or Harbor.

## Clean the cluster

If you want to clean the cluster, run the following command:

```shell
sealer delete -a
```

Please note that some information of the basic settings will be written to the cluster and stored in `/root/.sealer/Clusterfile` locally.

## SEE ALSO

+ [Kubefile](../concept/kubefile.md)
+ [Sealer Image](../concept/sealer-image.md)
+ [Sealer Cluster Image List](../sealer-images/cluster-images.md)
+ [Running sealer image as a Non-root User](../advanced/sealer-run-rootless.md)
