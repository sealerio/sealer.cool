# 保存helm chart包

Sealer支持将原始helm图表包保存为oci格式的云图像。
有了这个功能，我们可以在其他离线生产环境中拉取helm chart包。

## 先决条件

准备两个节点，分别命名为build节点和run节点。同时需要在上面安装sealer和helm。

## 例子

### 在构建节点上。

#### 启动docker registry以保存helm chart包。

启动docker registry将helm chart包转换为oci格式。

```shell
docker run -p 5000:5000  --restart=always --name registry -v /registry/:/var/lib/registry -d registry
```

使用helm push将helm chart包保存到registry。

```shell
export HELM_EXPERIMENTAL_OCI=1
helm push mysql-8.8.25.tgz oci://localhost:5000/helm-charts
```

#### 使用sealer build将helm chart包从本地registry保存到云镜像。

准备Kubefile:

```shell
[root@iZbp16ikro46xwgqzij67sZ build]# cat Kubefile
FROM kubernetes:v1.19.8
COPY imageList manifests
```

准备镜像列表文件:

```shell
[root@iZbp16ikro46xwgqzij67sZ build]# cat imageList
localhost:5000/helm-charts/mysql:8.8.25
localhost:5000/helm-charts/nginx:9.8.0
```

然后运行`sealer build -t my-kubernetes:v1.19.8 -f Kubefile.`，
我们可以使用`sealer save my-kubernetes:v1.19.8 -o my-kubernetes.tar`将镜像保存到本地文件系统。

### 在运行节点上。

从构建节点加载镜像 `my-kubernetes.tar`使用`sealer load -i my-kubernetes.tar`。

#### 使用sealer run启动集群

```shell
sealer run -d my-kubernetes:v1.19.8 -p password -m 172.16.0.230
```

#### 在运行节点上拉取Helm chart。

当集群启动时，我们可以使用helm pull拉取helm chart：

```shell
export HELM_EXPERIMENTAL_OCI=1
helm pull oci://sea.hub:5000/helm-charts/mysql --version 8.8.25
```

## 保存ACR chart

拉取`chart-registry.cn-shanghai.cr.aliyuncs.comaliyun-inc.comelasticsearch:1.0.1-elasticsearch.elasticsearch`chart的示例。

1. 登录您的ACR registry

```shell script
sealer login sealer login chart-registry.cn-shanghai.cr.aliyuncs.com \
   --username cnx-platform@prod.trusteeship.aliyunid.com --passwd xxx
```

2. 创建Kubefile和imageList

```shell script
[root@iZ2zeasfsez3jrior15rpbZ chart]# cat imageList
chart-registry.cn-shanghai.cr.aliyuncs.com/aliyun-inc.com/elasticsearch:1.0.1-elasticsearch.elasticsearch
[root@iZ2zeasfsez3jrior15rpbZ chart]# cat Kubefile
FROM kubernetes:v1.19.8
COPY imageList manifests
```

3. 构建ClusterImage 并将ACR远程chart保存到本地registry

```shell script
sealer build -t chart:latest .
```

4. 运行集群

```shell script
sealer run chart:latest -m x.x.x.x -p xxx
```

5. 尝试使用helm从本地registry中提取chart

```shell script
[root@iZ2zeasfsez3jrior15rpbZ certs]# helm pull oci://sea.hub:5000/aliyun-inc.com/elasticsearch --version 1.0.1-elasticsearch.elasticsearch
Warning: chart media type application/tar+gzip is deprecated
Pulled: sea.hub:5000/aliyun-inc.com/elasticsearch:1.0.1-elasticsearch.elasticsearch
Digest: sha256:c247fd56b985cfa4ad58c8697dc867a69ee1861a1a625b96a7b9d78ed5d9df95
[root@iZ2zeasfsez3jrior15rpbZ certs]# ls
elasticsearch-1.0.1-elasticsearch.elasticsearch.tgz
```

如果您遇到 `Error: failed to do request: Head "https:sea.hub:5000v2aliyun-inc.comelasticsearchmanifests1.0.1-elasticsearch.elasticsearch": x509: certificate signed by unknown authority` 错误，
请信任您主机上的registry证书：

```shell script
cp /var/lib/sealer/data/my-cluster/certs/sea.hub.crt /etc/pki/ca-trust/source/anchors/ && update-ca-trust extract
```