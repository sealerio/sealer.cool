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

## APP instruction

The `APP` instruction defines an app virtual object and specify the materials that needed to start an app,
and finally we can define the running object in terms of the dimensions of the `APP` by `LAUNCH` instruction.
For now, you can specify the type of material included:

+ Helm Chart
+ K8S YAML
+ Linux Shell

> command format：APP {command args ...}

USAGE：

For example:

+ Using `APP` instruction to define a `mysql` app and it will use remote chart file `https://charts/mysq.tgz` to start it and the remote file will be auto downloaded.

    `APP mysql https://charts/mysq.tgz`

+ Using `APP` instruction to define a `dashboard` app and it will use local k8s resource file `recommended.yaml` to start it.

    `APP dashboard local://recommended.yaml`

+ Using `APP` instruction to define a `business` app and it will use local shell file `install.sh` to start it.

    `APP business local://install.sh`

## LAUNCH instruction

The `LAUNCH` instruction specifies a list of apps to launch when sealer run. Only one `LAUNCH` instruction can be defined in the Kubefile.

And there are some points that require special attention:

+ The `LAUNCH` of the parent image will not be inherited, and you need to redefine it in the child image if you need to have it set.
+ The `LAUNCH` instruction and the `CMDS` instruction are in conflict, and only one of them can exist.

> command format：LAUNCH {command args ...}

USAGE：

For example ,Using `LAUNCH` instruction to start mysql and business apps defined by `APP` instruction.

`LAUNCH ["mysql","business"]`

