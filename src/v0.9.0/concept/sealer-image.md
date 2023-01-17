# Sealer Image

## What is Sealer Image?

A `Sealer Image` is a read-only file with all dependencies that needed to run a cluster and distributed applications.
Just like OCI Image, an image is often based on another image, with some additional customization.
In fact, the format of sealer image is also fully compliant with the [OCI specification](https://github.com/opencontainers).

## Application Image

An `Sealer Image` that does not contain Kubernetes and other KxS runtimes.

![](../../../attachment/images/app-kubefile.png)

### How to build an application image

Kubefile:

```
FROM scratch
APP mysql https://charts/mysql.tgz
APP elasticsearch https://charts/ elasticsearch.tgz
APP redis local://redis.yaml
APP businessApp local://install.sh
LAUNCH ["mysql", "redis", "businessApp"]
```

build command:

> NOTE: --type=kube-installer is the default value for sealer build

```
sealer build -f Kubefile -t my-app:1.0.0 --type=app-installer .
```

## Cluster Image

An `Sealer Image` that contains Kubernetes or other KxS runtimes.

![](../../../attachment/images/cluster-kubefile.png)

### How to build a custom cluster image

```shell
# sealer inspect docker.io/sealerio/kubernetes:v1.22.15
{
    "id": "bb75382891e7f04f192f1baeab18ef9c9f5503f4de8ac6dfc2a4d94f2164dde6",
    "name": "docker.io/sealerio/kubernetes:v1.22.15",
    "digest": "sha256:2f92b0149053ece9de6c683754f76fb9fd023a44540a9e33fc371afb8b76cc1b",
    "manifestv1": {
      ......
    },
    "ociv1": {
      ......
    },
    "buildClient": {
        "sealerVersion": "v0.9.0",
        "buildahVersion": "1.27.1"
    },
    "schemaVersion": "v1alpha1",
    "type": "kube-installer",
    "applications": [
        {
            "name": "calico",
            "type": "shell",
            "launchfiles": [
                "calico.sh"
            ],
            "version": "v1"
        }
    ],
    "launch": {
        "app_names": [
            "calico"
        ]
    }
}
```

Kubefile:

> NOTE: When we build an image based on a base image,
> we need to re-declare the app that needs to be launched in the base image for `LAUNCH` instruction.
>
> For more details about `APP` and `LAUNCH`, please refer to [Kubefile](kubefile.md)

```
FROM docker.io/sealerio/kubernetes:v1.22.15
APP mysql https://charts/mysql.tgz
APP elasticsearch https://charts/elasticsearch.tgz
APP redis local://redis.yaml
APP businessApp local://install.sh
LAUNCH ["calico", "mysql", "elasticsearch", "redis", "businessApp"]
```

or

```
FROM docker.io/sealerio/kubernetes:v1.22.15
COPY mysql.tgz .
COPY elasticsearch.tgz .
COPY redis.yaml .
COPY install.sh .
CMDS ["sh application/apps/calico/calico.sh", "helm install mysql.tgz", "helm install elasticsearch.tgz", "kubectl apply -f redis.yaml", "bash install.sh"]
```

build command:

> NOTE: --type=kube-installer is the default value for sealer build

```
sealer build -f Kubefile -t my-kubernetes:1.0.0 .
```
