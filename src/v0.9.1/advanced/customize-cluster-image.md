# Customize sealer image

## Customize the basefs

All the files which run a kubernetes cluster needs.

Contains:

* Bin files, like docker, containerd, crictl ,kubeadm, kubectl...
* Config files, like kubelet systemd config, docker systemd config, docker daemon.json...
* Registry docker image.
* Registry files, contains all the docker image, like kubernetes core component docker images...
* Scripts, some shell script using to install docker and kubelet... sealer will call init.sh and clean.sh.
* Other static files

rootfs dendrogram

```
.
├── application # app file, including chart package, script, yaml file.
│   └── apps
│       └── calico
│           └── calico.sh
├── applications
│   ├── custom-resources.yaml
│   └── tigera-operator.yaml
├── bin  # some binaries
│   ├── conntrack
│   ├── containerd-rootless-setuptool.sh
│   ├── containerd-rootless.sh
│   ├── crictl
│   ├── kubeadm
│   ├── kubectl
│   ├── kubelet
│   ├── nerdctl
│   └── seautil
├── cri # cri bin files include docker,containerd,runc.
│   └── docker.tar.gz
├── etc
│   ├── 10-kubeadm.conf
│   ├── daemon.json  # docker daemon config file.
│   ├── docker.service
│   ├── kubeadm.yml # kubeadm config including Cluster Configuration,JoinConfiguration and so on.
│   ├── kubeadm.yml.tmpl # kubeadm.yaml file template
│   ├── kubelet.service
│   └── registry_config.yml # docker registry config including storage root directory and http related config.
├── images # registry cri images.
│   └── docker-amd64-registry-image.tar.gz # registry docker image, will load this image and run a local registry in cluster.
├── lib # library file directory
│   ├── gperf-3.1.tar.gz
│   ├── install_libseccomp.sh
│   └── libseccomp-2.5.4.tar.gz
├── manifests # when the sealer builds, it will parse all the yaml files under this directory and extract the address of the container image inside, and then pull
│   └── imageList # this is a special file that contains a list of other mirror addresses that need to be pulled. For example, the mirror address cannot be resolved by the sealer in the CRD, so it needs to be manually configured in this file.
├── registry # will mount this dir to local registry
│   └── docker
│       └── registry
├── scripts # store script files
│   ├── docker.sh
│   ├── init-kube.sh
│   ├── init-registry.sh
│   ├── kubelet-pre-start.sh
│   └── uninstall-docker.sh
└── statics # yaml files, sealer will render values in those files
    └── audit-policy.yml
```

### How can I get basefs

1. Pull a BaseImage `sealer pull sealerio/kubernetes:v1-22-15-sealerio-2`
2. View the image layer information `sealer inspect kubernetes:v1-22-15-sealerio-2`
3. Get the image build file `sealer alpha mount kubernetes:v1-22-15-sealerio-2`

You will find the context of the image build.

### Build your own basefs

You can edit any files in basefs you want, for example you want to define your own docker daemon.json, just edit it and
build a new CloudImage.

```shell script
FROM scratch
COPY . .
```

```shell script
sealer build -t user-defined-kubernetes:v1.19.8 .
```

Then you can use this image as a BaseImage.

### OverWrite basefs files

Sometimes you don't want to care about the basefs context, but need custom some config.

You can use `kubernetes:v1-22-15-sealerio-2` as BaseImage, and use your own config file to overwrite the default file in
basefs.

For example: daemon.json is your docker engine config, using it to overwrite default config:

```shell script
FROM kubernetes:v1-22-15-sealerio-2
COPY daemon.json etc/
```

```shell script
sealer build -t user-defined-kubernetes:v1-22-15-sealerio-2 .
```

## Build the cloud image

### Build with specific directory

#### images directory

Directory to save container images,the offline image in this directory will be load into the built-in registry when
sealer run.

Examples: copy offline tar file to this directory.

`COPY mysql.tar images`

#### plugin directory

Directory to save plugin files, the plugin file in this directory will be load into the runtime interface when sealer
run.

Examples: copy plugin config file to this directory.

plugin config: shell.yaml:

```
apiVersion: sealer.io/v1
kind: Plugin
metadata:
  name: pre_init_host # Specify this plugin name,will dump in $rootfs/plugin dir.
spec:
  type: SHELL
  action: pre-init-host
  scope: master/node
  data: |
    set -e;set -x
    bash scripts/pre_init_host.sh
```

`COPY shell.yaml plugins`

#### charts directory

Directory to save charts packages,When sealer builds, it parses the charts file in this directory, and downloads and
saves the corresponding container image.

Examples: copy nginx charts to this directory.

`COPY nginx charts`

#### manifests directory

Directory to save yaml file or "imageList" file,When sealer builds, it parses the yaml and "imageList" file in this
directory, and downloads and saves the corresponding container image.

Examples: copy "imageList" file to this directory.

```shell
[root@iZbp143f9driomgoqx2krlZ build]# cat imageList
busybox
```

`COPY imageList manifests`

Examples: copy dashboard yaml file to this directory.

`COPY recommend.yaml manifests`

### Customize the private registry

Sealer optimizes and expands the docker registry, so that it can support proxy caching of multiple domain names and
multiple private registry at the same time.

During the build process, there will be a scenario where it uses a private registry which requires authentication. In
this scenario, the authentication of docker is required for image caching. You can perform the login operation first
through the following command before executing the build operation:

```shell
sealer login registry.com -u username -p password
```

Another dependent scenario, the kubernetes node is proxies to the private registry through the built-in registry of
sealer and the private registry needs to be authenticated, it can be configured through the custom registry config.Refer
to [registry config](https://github.com/sealerio/sealer/tree/main/docs/design/docker-image-cache.md)

You can customize the registry configuration by defining Kubefile:

```shell
FROM kubernetes:v1-22-15-sealerio-2
COPY registry_config.yaml etc/
```

### Customize the kubeadm configuration

Sealer will replace the default configuration with a custom configuration file in $Rootfs/etc/kubeadm.yml.

#### Example: Custom configuration using the Docker Unix socket.

1. customize kubeadm init configuration:

```yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: InitConfiguration
localAPIEndpoint:
  bindPort: 6443
nodeRegistration:
  criSocket: /var/run/dockershim.sock
```

2. customize kubeadm join configuration:

```yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: JoinConfiguration
caCertPath: /etc/kubernetes/pki/ca.crt
discovery:
  timeout: 5m0s
nodeRegistration:
  criSocket: /var/run/dockershim.sock
controlPlane:
  localAPIEndpoint:
    bindPort: 6443
```

3. Build your own cloud image that override default configurations with custom configurations. Note that,the file name "
   kubeadm.yml" is fixed:

```yaml
#Kubefile
FROM kubernetes:v1-22-15-sealerio-2
COPY kubeadm.yml etc
```

> sealer build -t user-define-kubeadm-kubernetes:v1-22-15-sealerio-2 .

#### Default kubeadm configuration file with completely contents:

pick any section of kubeadm.yml to customize:

```yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: InitConfiguration
localAPIEndpoint:
  # advertiseAddress: 192.168.2.110
  bindPort: 6443
nodeRegistration:
  criSocket: /var/run/dockershim.sock

---
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: v1.22.15
#controlPlaneEndpoint: "apiserver.cluster.local:6443"
imageRepository: sea.hub:5000/library
networking:
  # dnsDomain: cluster.local
  podSubnet: 100.64.0.0/10
  serviceSubnet: 10.96.0.0/22
apiServer:
  #  certSANs:
  #    - 127.0.0.1
  #    - apiserver.cluster.local
  #    - aliyun-inc.com
  #    - 10.0.0.2
  #    - 10.103.97.2
  extraArgs:
    #    etcd-servers: https://192.168.2.110:2379
    feature-gates: TTLAfterFinished=true,EphemeralContainers=true
    audit-policy-file: "/etc/kubernetes/audit-policy.yml"
    audit-log-path: "/var/log/kubernetes/audit.log"
    audit-log-format: json
    audit-log-maxbackup: '10'
    audit-log-maxsize: '100'
    audit-log-maxage: '7'
    enable-aggregator-routing: 'true'
  extraVolumes:
    - name: "audit"
      hostPath: "/etc/kubernetes"
      mountPath: "/etc/kubernetes"
      pathType: DirectoryOrCreate
    - name: "audit-log"
      hostPath: "/var/log/kubernetes"
      mountPath: "/var/log/kubernetes"
      pathType: DirectoryOrCreate
    - name: localtime
      hostPath: /etc/localtime
      mountPath: /etc/localtime
      readOnly: true
      pathType: File
controllerManager:
  extraArgs:
    feature-gates: TTLAfterFinished=true,EphemeralContainers=true
    experimental-cluster-signing-duration: 876000h
  extraVolumes:
    - hostPath: /etc/localtime
      mountPath: /etc/localtime
      name: localtime
      readOnly: true
      pathType: File
scheduler:
  extraArgs:
    feature-gates: TTLAfterFinished=true,EphemeralContainers=true
  extraVolumes:
    - hostPath: /etc/localtime
      mountPath: /etc/localtime
      name: localtime
      readOnly: true
      pathType: File
etcd:
  local:
    extraArgs:
      listen-metrics-urls: http://0.0.0.0:2381
---
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
mode: "ipvs"
ipvs:
  excludeCIDRs:
    - "10.103.97.2/32"

---
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
authentication:
  anonymous:
    enabled: false
  webhook:
    cacheTTL: 2m0s
    enabled: true
  x509:
    clientCAFile: /etc/kubernetes/pki/ca.crt
authorization:
  mode: Webhook
  webhook:
    cacheAuthorizedTTL: 5m0s
    cacheUnauthorizedTTL: 30s
cgroupDriver:
cgroupsPerQOS: true
clusterDomain: cluster.local
configMapAndSecretChangeDetectionStrategy: Watch
containerLogMaxFiles: 5
containerLogMaxSize: 10Mi
contentType: application/vnd.kubernetes.protobuf
cpuCFSQuota: true
cpuCFSQuotaPeriod: 100ms
cpuManagerPolicy: none
cpuManagerReconcilePeriod: 10s
enableControllerAttachDetach: true
enableDebuggingHandlers: true
enforceNodeAllocatable:
  - pods
eventBurst: 10
eventRecordQPS: 5
evictionHard:
  imagefs.available: 15%
  memory.available: 100Mi
  nodefs.available: 10%
  nodefs.inodesFree: 5%
evictionPressureTransitionPeriod: 5m0s
failSwapOn: true
fileCheckFrequency: 20s
hairpinMode: promiscuous-bridge
healthzBindAddress: 127.0.0.1
healthzPort: 10248
httpCheckFrequency: 20s
imageGCHighThresholdPercent: 85
imageGCLowThresholdPercent: 80
imageMinimumGCAge: 2m0s
iptablesDropBit: 15
iptablesMasqueradeBit: 14
kubeAPIBurst: 10
kubeAPIQPS: 5
makeIPTablesUtilChains: true
maxOpenFiles: 1000000
maxPods: 110
nodeLeaseDurationSeconds: 40
nodeStatusReportFrequency: 10s
nodeStatusUpdateFrequency: 10s
oomScoreAdj: -999
podPidsLimit: -1
port: 10250
registryBurst: 10
registryPullQPS: 5
rotateCertificates: true
runtimeRequestTimeout: 2m0s
serializeImagePulls: true
staticPodPath: /etc/kubernetes/manifests
streamingConnectionIdleTimeout: 4h0m0s
syncFrequency: 1m0s
volumeStatsAggPeriod: 1m0s
---
apiVersion: kubeadm.k8s.io/v1beta2
kind: JoinConfiguration
caCertPath: /etc/kubernetes/pki/ca.crt
discovery:
  timeout: 5m0s
nodeRegistration:
  criSocket: /var/run/dockershim.sock
controlPlane:
  localAPIEndpoint:
    bindPort: 6443
```

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

## Best practices

* Project address: [@basefs](https://github.com/sealerio/basefs)

* Customize auto-build documentation: [@auto-build-docs](https://github.com/sealerio/basefs/blob/main/context/README.md)