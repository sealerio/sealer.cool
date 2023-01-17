# Kubefile

A `Kubefile` is a text document that contains all the commands a user could call on the command line to assemble an
image.We can use the `Kubefile` to define a cluster image that can be shared and deployed offline. a `Kubefile` just
like `Dockerfile` which contains the build instructions to define the specific cluster.

## FROM instruction

The `FROM` instruction defines which base image you want reference, and the first instruction in Kubefile must be the
FROM instruction. Registry authentication information is required if the base image is a private image. By the way
official base images are available from the Sealer community.

> command format：FROM {your base image name}

USAGE：

For example ,use the base image `kubernetes:v1.19.8` which provided by the Sealer community to build a new cloud image.

`FROM docker.io/sealerio/kubernetes:v1.22.15`

## COPY instruction

The `COPY` instruction used to copy the contents from the context path such as file or directory to the `rootfs`, and the default src path is
the `rootfs` .If the specified destination directory does not exist, sealer will create it automatically.

> command format：COPY {src dest}

USAGE：

For example , copy `mysql.yaml`to`rootfs/mysql.yaml`

`COPY mysql.yaml .`

For example , copy directory `apollo` to `rootfs/charts/apollo`

`COPY apollo charts`

## APP instruction

The `APP` instruction defines an app virtual object and specify the materials that needed to start an app,
and finally we can define the running object in terms of the dimensions of the `APP` by `LAUNCH` instruction.

> command format：APP APP_NAME scheme:path1 scheme:path2

USAGE：

For example:

+ Using `APP` instruction to define a `mysql` app which contains files form the local chart dir `local://mysql/`.

    `APP mysql local://mysql/`

+ Using `APP` instruction to define a `dashboard` app which contains [remote k8s resource file](https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml) and the remote file will be auto downloaded.

    `APP dashboard https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml`

+ Using `APP` instruction to define a `dashboard` app which contains a local k8s resource file `recommended.yaml`.

    `APP dashboard local://recommended.yaml`

+ Using `APP` instruction to define a `business` app which contains a local shell file `install.sh`.

    `APP business local://install.sh`

## CNI instruction

The `CNI` instruction provides or overrides CNI plugins, the syntax is same with `APP`.

And there are some points that require special attention:

+ Multiple `CNI` definitions can be specified. If the name is the same, the last one takes precedence.
+ The `CNI` can be thought of as an `APP` with type Kubernetes CNI. Beyond this, it will automatically fills in the label `cluster.alpha.sealer.io/kube-cni` to declare the CNI list supported by the Sealer Image.

> command format：CNI CNI_NAME scheme:path1 scheme:path2

USAGE：

For example ,Using `CNI` instruction to define the Sealer Image supports both flannel and calico CNI plugin and use `LAUNCH` instruction to specifies that the flannel will be started by default.

```
CNI flannel https://raw.githubusercontent.com/flannel-io/flannel/v0.20.2/Documentation/kube-flannel.yml
CNI calico local://calico.sh
LAUNCH ["flannel"]
```

## CSI instruction

The `CSI` instruction provides or overrides CSI plugins.
Except it will automatically fills in the label `cluster.alpha.sealer.io/kube-csi`, other features are identical with `CNI`instruction

And there are some points that require special attention:

+ Multiple `CSI` definitions can be specified. If the name is the same, the last one takes precedence.
+ The `CSI` can be thought of as an `APP` with type Kubernetes CNI. Beyond this, it will automatically fills in the label `cluster.alpha.sealer.io/kube-csi` to declare the CNI list supported by the Sealer Image.

> command format：CSI CSI_NAME scheme:path1 scheme:path2

## CMD instruction

> NOTE: Deprecated, `LAUNCH` and `CMDS` are more recommended.

The format of CMD instruction is similar to RUN instruction, and also will execute any commands in a new layer. However,
the CMD command will be executed when the cluster is started . it is generally used to start applications or configure
the cluster. and it is different with `Dockerfile` CMD ,If you list more than one CMD in a `Kubefile` ,then all of them
will take effect.

> command format：CMD {command args ...}

USAGE：

For example ,Using `CMD` instruction to execute a commands that apply the kubernetes dashboard yaml.

`CMD kubectl apply -f recommended.yaml`

## CMDS instruction

> NOTE: `LAUNCH` instruction is more recommended than `CMDS`.

The format of CMDS instruction will execute any commands in a new layer. The CMDS command will be executed when `sealer run` .
It is generally used to start applications or configure the cluster.

And there are some points that require special attention:

+ Just like with `Dockerfile` CMD , if there are multiple `CMDS` instructions in the `Kubefile`, only the last one takes effect.
+ The `CMDS` of the parent image will not be inherited, and you need to redefine it in the child image if you need to have it set.
+ The `CMDS` instruction and the `LAUNCH` instruction are in conflict, and only one of them can exist.

> command format：CMD {command args ...}

USAGE：

For example ,Using `CMDS` instruction to execute a commands that apply the kubernetes dashboard yaml.

`CMDS ["kubectl apply -f recommended.yaml","echo success"]`

## APPCMDS instruction

The `APPCMDS` instruction specify the cmds for a specified app and the context is the dir of specified app.

And there are some points that require special attention:

+ If there are more than one `APPCMDS` for a `APP` then only the last `APPCMDS` will take effect.
+ The `APPCMDS` takes effect only if the corresponding APP_NAME is specified in `LAUNCH` instruction,
+ If no `APPCMDS` specified for APP_NAME, By default, the default command will be generated based on its type. For now, the following file or directory types are supported:
  + Helm Chart
  + K8S YAML
  + Linux Shell

> command format：APPCMDS APP_NAME ["executable","param1","param2"]

USAGE：

For example:

Using `APPCMDS` instruction to specify the launch cmds for nginx app to override the `kubectl apply -f nginx.yaml` command generated by default.

```
APP nginx local://nginx.yaml
APPCMDS nginx ["kubectl apply -f nginx.yaml -n nginx-namespace"]
LAUNCH ["nginx"]
```

## LAUNCH instruction

The `LAUNCH` instruction specifies a list of apps to launch when sealer run. Only one `LAUNCH` instruction can be defined in the `Kubefile`.

And there are some points that require special attention:

+ The `LAUNCH` of the parent image will not be inherited, and you need to redefine it in the child image if you need to have it set.
+ The `LAUNCH` instruction and the `CMDS` instruction are in conflict, and only one of them can exist.

> command format：LAUNCH {command args ...}

USAGE：

For example ,Using `LAUNCH` instruction to start mysql and business apps defined by `APP` instruction.

`LAUNCH ["mysql","business"]`

## LABEL instruction

The `LABEL` instruction allows to add some metadata to a Sealer Image just like `Dockerfile LABEL instruction`.

And there are some points that require special attention:

+ An image can have more than one label. You can specify multiple labels on a single line.
+ Sealer reserves all label keys prefixed with `sealer.io`, such as:
  + `cluster.alpha.sealer.io/cluster-runtime-type`, supported cluster runtime type, such as kubernetes, k0s, k3s, etc
  + `cluster.alpha.sealer.io/cluster-runtime-version`, supported cluster runtime version
  + `cluster.alpha.sealer.io/container-runtime-type`, supported container runtime type, such as docker, containerd, etc
  + `cluster.alpha.sealer.io/container-runtime-version`, supported container runtime version
  + `cluster.alpha.sealer.io/kube-cni`, supported cni plugin list, such as calico，flannel, etc
  + `cluster.alpha.sealer.io/kube-csi`, supported csi plugin list
  + `app.alpha.sealer.io/supported-kube-version`, a [SemVer](https://github.com/Masterminds/semver) range of compatible Kubernetes versions by the applications
+ All labels will be inherited by child image.
+ In general, a base [Sealer Cluster Image](sealer-image.md#cluster-image) should declare supported cluster runtimes, container runtimes, etc.

```
command format：
LABEL <key>=<value> <key>=<value> <key>=<value> ...
LABEL <key>=<value> \
      <key>=<value> \
      <key>=<value> ...
```

USAGE：

For example ,Using `LABEL` instruction to define the supported cluster runtime and container runtime info for Sealer Image.

```
LABEL "cluster.alpha.sealer.io/cluster-runtime-version"="v1.22.15"
LABEL "cluster.alpha.sealer.io/cluster-runtime-type"="kubernetes"
LABEL "cluster.alpha.sealer.io/container-runtime-type"="docker"
LABEL "cluster.alpha.sealer.io/container-runtime-version"="20.10.14"
```

## KUBEVERSION

The `KUBEVERSION` instruction defines a [SemVer](https://github.com/Masterminds/semver) range of compatible Kubernetes versions for a [Sealer Application Image](sealer-image.md#application-image).
In fact, the `KUBEVERSION` instruction is equivalent to the `LABEL app.alpha.sealer.io/supported-kube-version`.

And there are some points that require special attention:

+ If there are multiple apps in the `Kubefile`, you should take the intersection of the cluster versions they support
+ Some checks will be done against the `KUBEVERSION` value, and the value must follow the format [SemVer range](https://github.com/Masterminds/semver).

> command format：KUBEVERSION {command args ...}

USAGE：

For example ,Using `KUBEVERSION` instruction to declare that the `Sealer Image` supports kubernetes version between 1.22 and 1.24.

`KUBEVERSION 1.22 - 1.24`
