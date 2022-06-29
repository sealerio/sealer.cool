# Raw docker基础镜像

## 整体架构

现有的基础镜像大多使用定制的 docker，但许多k8s集群使用原始docker作为容器运行时。所以有必要提供一个带有raw docker的基础镜像，这个页面是如何使用raw docker获取基础镜像的指南。

## 用例

### 怎样使用它

我们提供了一个官方的基础镜像，它使用官方的原始docker作为容器运行时：`kubernetes-rawdocker:v1.19.8`。如果你想创建一个k8s集群，你可以直接使用它作为 `sealer run` 命令的参数或者将它写入你的 Clusterfile。如果你想用它作为基础镜像通过`sealer build`构建其他镜像，`FROM kubernetes-rawdocker:v1.19.8`应该是你Kubefile的第一行。

### 怎样去构建raw docker基础镜像

#### Step 1：选择基础镜像

获取您稍后将对其进行修改的镜像，您可能会将其视为您的基础镜像。为了演示工作流程，我将使用 `kubernetes:v1.19.8`。你可以通过执行`sealer pull kubernetes:v1.19.8`得到相同的镜像。

#### Step 2: 找到稍后将使用的图层

通过执行`sealer inspect kubernetes:v1.19.8`找到镜像层id。此镜像中有四层，您将只使用其中的两层。第一个的id是`c1aa4aff818df1dd51bd4d28decda5fe695bea8a9ae6f63a8dd5541c7640b3d6`，它由bin文件、配置文件、注册表文件、脚本等组成。（下面我用{layer-id-1}来指代，其实是一个sha256字符串）另外一个的id是`991491d3025bd1086754230eee1a04b328b3d737424f1e12f708d651e6d66860`，由网络组件yaml文件组成。（下面我会用{layer-id-2}来指代，其实也是一个sha256字符串）

#### Step 3: 获取官方raw docker

如果您的机器基于x86_64架构，请从 `https:download.docker.comlinuxstaticstablex86_64` 中选择一个原始docker二进制版本，然后下载它。（其他架构可以在`https:download.docker.comlinuxstaticstable`找到）

#### Step 4: 更换 sealer hacked docker

将 `varlibsealerdataoverlay2{layer-id-1}cridocker.tar.gz` 替换为您在步骤3中下载的文件，在替换之前您应该做一些处理。注意替换后的压缩文件名和解压的工作目录树要确保和以前一样。在这种情况下，您应该解压您在第3步中下载的文件，进入 `docker` 目录并将该目录中的所有文件tar到一个名为 `docker.tar.gz` 的输出文件。

#### Step 5: 更换 sealer hacked registry

拉取官方“registry”镜像并替换`varlibsealerdataoverlay2{layer-id-1}imagesregistry.tar`中现有的自定义“registry”镜像。首先确保raw docker已经安装，然后执行 `docker pull registry:2.7.1 && docker save -o registry.tar registry:2.7.1 && mv registry.tar varlibsealerdataoverlay2{layer-id-1}imagesregistry.tar`。

#### Step 6: 修改daemon.json

在 `varlibsealerdataoverlay2{layer-id-1}etc` 编辑文件 'daemon.json'，删除 `mirror-registries` 属性。

#### Step 7: 构建raw docker alpine镜像

切换到目录 `/var/lib/sealer/data/overlay2/{layer-id-1}/`, 编辑 `Kubefile` 并确保它的内容是：

```shell script
FROM scratch
COPY . .
```

然后通过执行`sealer build --mode lite -t kubernetes-rawdocker:v1.19.8-alpine .`来构建镜像。

#### 扩展

#### Step 8: 将网络组件添加到alpine镜像

现在基础镜像还需要网络组件才能让k8s集群正常运行，这里我们提供一下添加calico作为网络组件的指南。
首先，创建一个 `rawdockerBuild` 目录作为你的构建环境。然后你应该将文件“tigera-operator.yaml”和文件“custom-resources.yaml”从`varlibsealerdataoverlay2{layer-id-2}etc`移动到`rawdockerBuildetc`。
之后，您仍然需要修改这两个文件中的一些内容，以确保它们创建的pod将从您的私有registry中提取docker镜像，这将使您的k8s集群在离线情况下仍然可以正常工作。
在这种情况下，首先在“custom-resources.yaml”中添加一个map-key值，key为`spec.registry`，value为`sea.hub:5000`，然后修改“tigera-”中的所有docker镜像名称operator.yaml" 从 `<registry><repository><imageName>:<imageTag>` 到 `sea.hub:5000<repository><imageName>:<imageTag>`。
接下来在 `rawdockerBuild` 目录下创建一个 `imageList` 文件，内容如下：

- calico/cni:v3.19.1
- calico/kube-controllers:v3.19.1
- calico/node:v3.19.1
- calico/pod2daemon-flexvol:v3.19.1
- calico/typha:v3.19.1
- tigrea/operator:v1.17.4

它们都是创建网络组件所需的镜像，请确保标签与yaml文件“tigera-operator.yaml”和“custom-resources.yaml”中声明的一致。

#### Step 9: 构建raw docker镜像

切换到 `rawdockerBuild` 目录，创建一个 `Kubefile` 并确保其内容为:

```shell script
FROM kubernetes-rawdocker:v1.19.8-alpine
COPY imageList manifests
COPY etc .
CMD kubectl apply -f etc/tigera-operator.yaml && kubectl apply -f etc/custom-resources.yaml
```

然后通过执行构建镜像`sealer build --mode lite -t kubernetes-rawdocker:v1.19.8 .`.