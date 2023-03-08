# Customize base clusterimage

## For kubernetes

On the way~

## For k0s

The build content all your need, following is an x86_64 arch case:

```bash tree
.
├── amd64
│   ├── bin
│   │   ├── conntrack
│   │   ├── containerd-rootless-setuptool.sh
│   │   ├── containerd-rootless.sh
│   │   ├── crictl
│   │   ├── k0s
│   │   ├── kubectl
│   │   ├── nerdctl
│   │   └── seautil
│   ├── cri
│   │   └── containerd.tar.gz
│   └── images
│       └── nerdctl-amd64-registry-image.tar.gz
├── imageList
├── Kubefile
└── rootfs
    ├── etc
    │   ├── containerd-config.toml
    │   ├── containerd.service
    │   └── registry_config.yml
    ├── lib
    ├── manifests
    └── scripts
        ├── containerd.sh
        ├── init-kube.sh
        ├── init-registry.sh
        └── uninstall-containerd.sh
```

Kubefile:

```dockerfile
FROM scratch
COPY rootfs .
COPY amd64 .
COPY imageList manifests
LABEL "cluster.alpha.sealer.io/cluster-runtime-version"="v1.24.10"
LABEL "cluster.alpha.sealer.io/cluster-runtime-type"="k0s"
LABEL "cluster.alpha.sealer.io/container-runtime-type"="containerd"
LABEL "cluster.alpha.sealer.io/container-runtime-version"="1.5.12"
```

imageList:

```text
quay.io/k0sproject/apiserver-network-proxy-agent:0.0.32-k0s1
docker.io/coredns/coredns:1.7.1
registry.k8s.io/kube-proxy:v1.24.10
registry.k8s.io/metrics-server/metrics-server:v0.5.2
registry.k8s.io/pause:3.6
docker.io/cloudnativelabs/kube-router:v1.4.0
quay.io/k0sproject/cni-node:1.1.1-k0s.0
docker.io/calico/cni:v3.23.5
docker.io/calico/kube-controllers:v3.23.5
docker.io/calico/node:v3.23.5
```

build:

```shell
sealer build -f Kubefile -t my-k0s:1.24.10 .
```