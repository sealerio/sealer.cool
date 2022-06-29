# Kyverno 基础镜像

## 动机

常见的一些k8s集群有自己的私有镜像registry，并且出于某些原因他们不想从其他registry中拉取镜像。这个页面是关于如何将kyverno集成到k8s集群中，它将镜像拉取请求重定向到指定的registry。

## 用例

### 怎样使用它

我们提供了一个官方的基础镜像，它将kyverno集成到集群中：`kubernetes-kyverno:v1.19.8`。注意它除了运行k8s集群所必需的以外没有包含docker镜像，所以如果你想使用这个集群镜像，并且你还需要其他docker镜像（例如`nginx`）来运行容器，你需要缓存docker 镜像到你的私有registry。

当然 `sealer` 可以帮助你做到这一点，以 `nginx` 为例。
首先在文件`imageList`中包含nginx。
您可以执行 `cat imageList` 以确保您已完成此操作，结果可能如下所示：

```
 [root@ubuntu ~]# cat imageList
 nginx:latest
```

其次编辑具有以下内容的Kubefile：

```
FROM kubernetes-kyverno:v1.19.8
COPY imageList manifests
CMD kubectl run nginx --image=nginx:latest
```

第三次执行`sealer build`来构建一个新的集群镜像

```
 [root@ubuntu ~]# sealer build -t my-nginx-kubernetes:v1.19.8 .
```

只需一个简单的命令，让 sealer 帮助您将 `nginx:latest` 镜像缓存到私有注册表。
你可能会怀疑 sealer 是否成功缓存了图片，请执行 `sealer inspect my-nginx-kubernetes:v1.19.8` 找到 `spec` 部分的 `layer` 属性，你会发现有很多层。在这种情况下，最后一层有两个 `key:value` 对：`type: BASE`、`value: registry cache`，
从中我们知道它是关于缓存到注册表的镜像。记住这一层的id，执行`cd varlibsealerdataoverlay2{layer-id}registrydockerregistryv2repositorieslibrary`，然后你会发现目录中存在nginx镜像。
现在您可以使用这个新的云镜像来创建k8s集群。在你的集群启动后，已经有一个 pod 运行 `nginx:latest` 镜像，你可以通过执行 `kubectl describe pod nginx` 看到它，你也可以创建更多运行 `nginx:latest` 镜像的 pod。

### 怎样构建kyverno基础镜像

以下是构建kyverno内置云镜像的顺序步骤

#### Step 1: 选择基础镜像

选择一个可以创建至少一个主节点和一个工作节点的 k8s 集群的基础镜像。为了演示工作流程，我将使用 `kubernetes-rawdocker:v1.19.8`。您可以通过执行 `sealer pull kubernetes-rawdocker:v1.19.8` 获得相同的镜像。

#### Step 2: 获取kyverno install.yaml并缓存镜像

在`https:raw.githubusercontent.comkyvernokyvernorelease-1.5definitionsreleaseinstall.yaml`下载kyverno的“install.yaml”，你可以替换成你想要的版本。我在这个演示中使用 1.5。

为了在离线环境中使用 kyverno 基础镜像，您需要缓存 `install.yaml` 中使用的镜像。在这种情况下，需要缓存两个docker镜像：`ghcr.iokyvernokyverno:v1.5.1` 和 `ghcr.iokyvernokyvernopre:v1.5.1`。
因此，首先在 `install.yaml` 中将它们重命名为 `sea.hub:5000kyvernokyverno:v1.5.1` 和 `sea.hub:5000kyvernokyvernopre:v1.5.1`，其中 `sea.hub:5000` 是你的 k8s 集群。然后创建一个包含以下内容的文件`imageList`：

```
ghcr.io/kyverno/kyverno:v1.5.1
ghcr.io/kyverno/kyvernopre:v1.5.1
```

#### Step 3: 创建集群策略

创建一个包含以下内容的 yaml：

```yaml
apiVersion : kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: redirect-registry
spec:
  background: false
  rules:
  - name: prepend-registry-containers
    match:
      resources:
        kinds:
        - Pod
    preconditions:
      all:
      - key: "{{request.operation}}"
        operator: In
        value:
        - CREATE
        - UPDATE
    mutate:
      foreach:
      - list: "request.object.spec.containers"
        patchStrategicMerge:
          spec:
            containers:
            - name: "{{ element.name }}"
              image: "sea.hub:5000/{{ images.containers.{{element.name}}.path}}:{{images.containers.{{element.name}}.tag}}"
  - name: prepend-registry-initcontainers
    match:
      resources:
        kinds:
        - Pod
    preconditions:
      all:
      - key: "{{request.operation}}"
        operator: In
        value:
        - CREATE
        - UPDATE
    mutate:
      foreach:
      - list: "request.object.spec.initContainers"
        patchStrategicMerge:
          spec:
            initContainers:
            - name: "{{ element.name }}"
              image: "sea.hub:5000/{{ images.initContainers.{{element.name}}.path}}:{{images.initContainers.{{element.name}}.tag}}"

```

此ClusterPolicy会将镜像拉取请求重定向到私有注册表 `sea.hub:5000`，我将此文件命名为 redirect-registry.yaml

#### Step 4: 创建一个shell脚本去监控kyverno pod

因为kyverno pod的状态应该是running，所以ClusterPolicy将起作用。建议创建并运行以下shell脚本来监控kyverno pod的状态，直到它开始运行。

```shell
#!/bin/bash

echo "[kyverno-start]: Waiting for the kyverno to be ready..."

while true
do
    clusterPolicyStatus=`kubectl get cpol -o go-template --template={{range.items}}{{.status.ready}}{{end}}`;
    if [ "$clusterPolicyStatus" == "true" ];then
        break;
    fi
    sleep 1
done

echo "kyverno is running"
```

命名这个文件 `wait-kyverno-ready.sh`.

#### Step 5: 创建构建内容

创建一个`kyvernoBuild`目录，其中包含五个文件：步骤2中的etcinstall.yaml和imageList、步骤3中的etcredirect-registry.yaml、步骤4中的 scriptswait-kyverno-ready.sh 和一个Kubefile，其内容如下：

```shell
FROM kubernetes-rawdocker:v1.19.8
COPY imageList manifests
COPY etc .
COPY scripts .
CMD kubectl create -f etc/install.yaml && kubectl create -f etc/redirect-registry.yaml
CMD bash scripts/wait-kyverno-ready.sh
```

#### Step 6: 构建这个镜像

假设你在`kyvernoBuild`目录，请执行 `sealer build --mode lite -t kubernetes-kyverno:v1.19.8 。