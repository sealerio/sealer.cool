# Clusterfile

Clusterfile is a file that is used to describe the desired cluster state, such as node information, node configuration,
and various startup configurations. it supports more flexible cluster configs like user defined kubeadm config, helm
values config overwriting, plugins ...

This file can contain multiple objects in YAML format, such as cluster API, plugin API, config API.

## Cluster API

### Cluster Spec

ClusterSpec defines the desired state of Cluster

```
type ClusterSpec struct {
	// desired cluster image name.
	Image string `json:"image,omitempty"`
	// cluster level ENV list. it can be used to render configurations files under rootfs.
	Env     []string `json:"env,omitempty"`
	// it's a string list to overwrite cluster image`s boot command.
	CMD     []string `json:"cmd,omitempty"`
	// APPNames This field allows user to specify the app name they want to run launch.
	APPNames []string `json:"appNames,omitempty"`
	//hosts information for the cluster.
	Hosts    []Host   `json:"hosts,omitempty"`
	// cluster level ssh configs, if all cluster host is the same credentials, only need to set this field.
	SSH      v1.SSH   `json:"ssh,omitempty"`
	// HostAliases holds the mapping between IP and hostnames that will be injected as an entry in the
	// host's hosts file.
	HostAliases []HostAlias `json:"hostAliases,omitempty"`
	// Registry field contains configurations about local registry and remote registry.
	Registry Registry `json:"registry,omitempty"`
}

type Host struct {
	// host ip list.
	IPS   []net.IP `json:"ips,omitempty"`
	// Host roles, its value is "master" Or "node".
	Roles []string `json:"roles,omitempty"`
	//host SSH configs.
	SSH v1.SSH `json:"ssh,omitempty"`
	//host level env list.
	Env    []string          `json:"env,omitempty"`
	// If not nil, labels will be set on this host.
	Labels map[string]string `json:"labels,omitempty"`
	// If not nil, taints will be set on this host.
	Taints []string          `json:"taints,omitempty"`
}


type HostAlias struct {
	// IP address of the host file entry.
	IP string `json:"ip,omitempty"`
	// Hostnames for the above IP address.
	Hostnames []string `json:"hostnames,omitempty"`
}

type Registry struct {
	// LocalRegistry is the sealer builtin registry configuration
	LocalRegistry *LocalRegistry `json:"localRegistry,omitempty"`
	// ExternalRegistry used to serve external registry service. do not support yet.
	ExternalRegistry *ExternalRegistry `json:"externalRegistry,omitempty"`
}

type RegistryConfig struct {
	Domain   string `json:"domain,omitempty"`
	Port     int    `json:"port,omitempty"`
	Username string `json:"username,omitempty"`
	Password string `json:"password,omitempty"`
}

type ExternalRegistry struct {
	RegistryConfig
}

type LocalRegistry struct {
	RegistryConfig
	// HA indicate that whether local registry will be deployed on all master nodes.
	// if LocalRegistry is not specified, default value is true.
	HA *bool `json:"ha,omitempty"`
	// Insecure indicated that whether the local registry is exposed in HTTPS.
	// if true sealer will not generate default ssl cert.
	Insecure *bool   `json:"insecure,omitempty"`
	// Additional cert configuration information for the built-in registry
	Cert     TLSCert `json:"cert,omitempty"`
}

type TLSCert struct {
	SubjectAltName *SubjectAltName `json:"subjectAltName,omitempty"`
}

type SubjectAltName struct {
	DNSNames []string `json:"dnsNames,omitempty"`
	IPs      []string `json:"ips,omitempty"`
}

```

### Use cases

#### Apply a simple cluster by default

create 3 masters and a node using cluster image `docker.io/sealerio/kubernetes:v1.22.15`

```yaml
apiVersion: sealer.cloud/v2
kind: Cluster
metadata:
  name: default-kubernetes-cluster
spec:
  image: docker.io/sealerio/kubernetes:v1.22.15
  ssh:
    passwd: xxx
  hosts:
    - ips: [ 192.168.0.2,192.168.0.3,192.168.0.4 ]
      roles: [ master ]
    - ips: [ 192.168.0.5 ]
      roles: [ node ]
```

#### Different hosts have different credential (for example password,and port)

`cluster.spec.ssh` is cluster level ssh credential, if different hosts have different credential we only need to set
the `cluster.spec.hosts.ssh`.

```yaml
apiVersion: sealer.cloud/v2
kind: Cluster
metadata:
  name: default-kubernetes-cluster
spec:
  image: docker.io/sealerio/kubernetes:v1.22.15
  ssh:
    passwd: xxx
    port: "2222"
  hosts:
    - ips: [ 192.168.0.2 ] # this master ssh port is different with others.
      roles: [ master ]
      ssh:
        passwd: yyy
        port: "22"
    - ips: [ 192.168.0.3,192.168.0.4 ]
      roles: [ master ]
    - ips: [ 192.168.0.5 ]
      roles: [ node ]
```

#### Pre-set roles,labels,taints for cluster node

set `cluster.spec.hosts.labels`, `cluster.spec.hosts.roles` and `cluster.spec.hosts.taints` in Clusterfile.

```yaml
apiVersion: sealer.cloud/v2
kind: Cluster
metadata:
  name: my-cluster
spec:
  hosts:
    - ips:
        - 172.16.26.162
      labels:
        fake: labels
      roles:
        - master
      taints:
        - key1=value1:NoSchedule
    - ips:
        - 172.16.26.165
      labels:
        sealer: test
      roles:
        - node
  image: docker.io/sealerio/kubernetes:v1.22.15
  ssh:
    passwd: password
    pk: /root/.ssh/id_rsa
    port: "22"
    user: root
```

#### Overwrite cluster image`s boot command.

we can overwrite the boot command by set `cluster.spec.cmd` in Clusterfile, this will only execute the `cmd` value to
launch cluster image.

```yaml
apiVersion: sealer.cloud/v2
kind: Cluster
metadata:
  name: default-kubernetes-cluster
spec:
  image: docker.io/sealerio/kubernetes:v1.22.15
  ssh:
    passwd: xxx
  hosts:
    - ips: [ 192.168.0.2,192.168.0.3,192.168.0.4 ]
      roles: [ master ]
    - ips: [ 192.168.0.5 ]
      roles: [ node ]
  cmd: [ "kubectl apply -f etc/tigera-operator.yaml", "kubectl apply -f etc/custom-resources.yaml" ]
```

#### Overwrite cluster image`s boot apps.

we can overwrite the boot apps by set `cluster.spec.appNames` in Clusterfile, if a cluster image contains one or more
apps by default.

```yaml
apiVersion: sealer.cloud/v2
kind: Cluster
metadata:
  name: default-kubernetes-cluster
spec:
  image: myimage-with-nginx-mysql:v1
  ssh:
    passwd: xxx
  hosts:
    - ips: [ 192.168.0.2,192.168.0.3,192.168.0.4 ]
      roles: [ master ]
    - ips: [ 192.168.0.5 ]
      roles: [ node ]
  appNames: [ "nginx" ]
```

#### Using cluster ENV in Clusterfile

cluster `cluster.spec.env` is used to render go template files under rootfs directory which file name is with
extension ".tmpl".

files under below directory will be rendered by default.

1. "${rootfs}/etc"
2. "${rootfs}/charts"
3. "${rootfs}/manifests"

for example ,if we want to customize kubeadm config like "podSubnet" and "serviceSubnet" at `etc/kubeadm.yaml.tmpl`
using env render.

```yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: v1.22.15
controlPlaneEndpoint: "apiserver.cluster.local:6443"
imageRepository: sea.hub:5000
networking:
  podSubnet: { { .PodCIDR } }
  serviceSubnet: { { .SvcCIDR } }
```

set "PodCIDR=172.24.0.0/24","SvcCIDR=10.96.0.0/16" in `cluster.spec.env`, sealer will render the "kubeadm.yaml.tmpl"
file and create a new file named `kubeadm.yaml`,and will use the new one to init the cluster.

```yaml
apiVersion: sealer.cloud/v2
kind: Cluster
metadata:
  name: my-cluster
spec:
  env:
    - PodCIDR=100.64.0.0/10
    - SvcCIDR=10.96.0.0/16
  hosts:
    ips:
      - 172.16.0.197
    roles:
      - master
    ssh:
      passwd: password123
      port: "22"
      user: root
  image: docker.io/sealerio/kubernetes:v1.22.15
```

#### Using host ENV in Clusterfile

Host env `cluster.spec.hosts.env` is generally used to configure script and plugin execution environment variables ,it
also inherits the cluster's env `cluster.spec.env` list.

for example, some node have different storage device, we can set its real value by exporting host env to shell scripts.
cluster default storage device is "StorageDevice=/dev/vdc", while master node is "StorageDevice=/dev/vde", sealer will
use host env "StorageDevice=/dev/vde" for master node as their key is equal.

```yaml
apiVersion: sealer.cloud/v2
kind: Cluster
metadata:
  name: my-cluster
spec:
  image: docker.io/sealerio/kubernetes:v1.22.15
  env:
    - EtcdDevice=/dev/vdb # EtcdDevice is device for etcd, default is "", which will use system disk
    - StorageDevice=/dev/vdc # StorageDevice is device for kubelet and container daemon, default is "", which will use system disk
  hosts:
    - ips: [ 192.168.0.2 ]
      roles: [ master ] # add role field to specify the node role
      env: # all env are NOT necessary, rewrite some nodes has different env config
        - EtcdDevice=/dev/vdb
        - StorageDevice=/dev/vde
    - ips: [ 192.168.0.3 ]
      roles: [ node ]
```

## Config API

Using config, you can overwrite or merge any config files you want. Like chart values, kubeadm config file ...

### Config Spec

below is the ConfigSpec, it defines the desired state of Config resource.

```
type ConfigSpec struct {
	// Enumeration value is "merge" and "overwrite". default value is "overwrite".
	// Only yaml files format are supported if strategy is "merge", this will deeply merge each yaml file section.
	// Otherwise, will overwrite the whole file content with config data.
	Strategy string `json:"strategy,omitempty"`
	// preprocess with processor: value|toJson|toBase64|toSecret
	Process  string `json:"process,omitempty"`
	// config real data
	Data     string `json:"data,omitempty"`
	// the path to write the configs.the desired state of Cluster
	Path     string `json:"path,omitempty"`
}
```

### Use cases

#### Using config to overwrite mysql chart values

Append you config file into Clusterfile like this:

```yaml
apiVersion: sealer.aliyun.com/v1alpha1
kind: Config
metadata:
  name: mysql-config
spec:
  path: application/apps/mysql/mysql.yaml
  data: |
    mysql-user: root
    mysql-passwd: xxx
```

sealer will overwrite the file `config.spec.path`("application/apps/{APP name}/{you target file}") under cluster image
with the specified value `config.spec.data`.

#### Using processor to pre process data into a specific format

Currently, sealer supported preprocessor list:

1. `value`: used to indicate that whether preprocess the entire data. if not set ,will only preprocess the value.
2. `toJson`: convert data to json format.
3. `toBase64`: encode data to base64 string.
4. `toSecret`: convert data to k8s secret format.

we can freely combine these processors, if strategy is `tojson|tobase64` the entire data will be converted to json and
then encoded to base64 string.

Examples:

this will convert value to json, and then encoded it to base64 string.

```
apiVersion: sealer.aliyun.com/v1alpha1
kind: Config
metadata:
  name: mysql-config
spec:
  path: etc/mysql.yaml
  process: value|toJson|toBase64 # pre process pipeline
  data:
      config:
         username: root
         passwd: xxx
```

pre process data to json:

```json
{
  "username": "root",
  "passwd": "xxx"
}
```

then process to base64: `ewogICJ1c2VybmFtZSI6ICJyb290IiwKICAicGFzc3dkIjogInh4eCIKfQ==` and write to `config.spec.path`:
etc/mysql.yaml with the content:

```
config: ewogICJ1c2VybmFtZSI6ICJyb290IiwKICAicGFzc3dkIjogInh4eCIKfQ==
```

## Plugin API

### Plugin Spec

PluginSpec defines the desired state of Plugin

```
type PluginSpec struct {
	Type   string `json:"type,omitempty"`
	Data   string `json:"data,omitempty"`
	Action string `json:"action,omitempty"`
	Scope  string `json:"scope,omitempty"`
}
```

1. for `PluginSpec.Type`: plugin type,currently only supported "SHELL".
2. for `PluginSpec.Data`: plugin`s real data, sealer will use it to do actual action.
3. for `PluginSpec.Scope`: plugin`s scope, it is usually the role name, support use '|' to specify multiple scopes.
4. for `PluginSpec.Action`: phase of this plugin will run. below is the phase list we currently supported.

plugin will be executed by `PluginSpec.Name` in alphabetical order at the same stage.

The following is a detailed introduction for plugin action.

| action name | action scope | explanation |
| :-----| ----: | :----: |
| pre-init-host | cluster host | will run before init cluster host |
| post-init-host | cluster host | will run after init cluster host  |
| pre-clean-host | cluster host | will run before clean cluster host  |
| post-clean-host | cluster host | will run after clean cluster host  |
| pre-install | master0 | will run before install cluster |
| post-install | master0 | will run after install cluster  |
| pre-uninstall | master0 | will run before uninstall cluster |
| post-uninstall | master0 | will run after uninstall cluster  |
| pre-scaleup | master0 | will run before scaleup cluster |
| post-scaleup | master0 | will run after scaleup cluster  |

### Use cases

#### Configure the system disk before initialize the host

use `pre-init-host` to init each host`s disk.

```yaml
apiVersion: sealer.aliyun.com/v1alpha1
kind: Plugin
metadata:
  name: pre_init_host
spec:
  type: SHELL
  action: pre-init-host
  scope: master | node
  data: |
    set -x
    bash scripts/pre_init_disk.sh
    if [ $? -ne 0 ];then
      exit 1
    fi
```

#### Configure cluster storage class after install the cluster

use `post-install` to configure cluster storage class.

```yaml
apiVersion: sealer.aliyun.com/v1alpha1
kind: Plugin
metadata:
  name: post_install
spec:
  type: SHELL
  action: post-install
  data: |
    set -x
    # process taints first
    if [ "${RemoveMasterTaint}" == "true" ];then
      kubectl taint node node-role.kubernetes.io/master- --all || true
    fi
    # set default storageclass and snapshot
    kubectl annotate storageclass yoda-lvm-default snapshot.storage.kubernetes.io/is-default-class="true" --overwrite
    kubectl annotate storageclass yoda-lvm-default storageclass.kubernetes.io/is-default-class="true" --overwrite
```

## Application API

### Application Spec

ApplicationSpec defines the desired state of Application

```yaml
type ApplicationSpec struct {
  //Cmds raw command line which has the highest priority, is mutually exclusive with the AppNames parameter
  // it could be overwritten from ClusterSpec.CMD and cli flags, and it is not required.
  Cmds []string `json:"cmds"`

  //LaunchApps This field allows user to specify the app names they want to launch.
  // it could be overwritten from ClusterSpec.APPNames and cli flags.
  LaunchApps []string `json:"launchApps,omitempty"`

  // Configs Additional configurations for the specified app
  //it will override the default launch command and delete command, as well as the corresponding app files.
  Configs []ApplicationConfig `json:"configs,omitempty"`
}

type ApplicationConfig struct {
  // the AppName
  Name string `json:"name,omitempty"`

  // app Launch customization
  Launch *Launch `json:"launch,omitempty"`

  Files []AppFile `json:"files,omitempty"`
}

type Launch struct {
  // Cmds raw cmds support, not required, exclusive with app type.
  Cmds []string `json:"cmds,omitempty"`
}

type AppFile struct {
  // Path represents the path to write the Values, required.
  Path string `json:"path,omitempty"`

  // Enumeration value is "merge", "overwrite".
  Strategy Strategy `json:"strategy,omitempty"`

  // Data real app launch need.
  // it could be raw content, yaml data, yaml section data, key-value pairs, and so on.
  Data string `json:"data,omitempty"`
}
```

### Use cases

#### overwrite image launch cmds

```yaml
apiVersion: sealer.io/v2
kind: Application
metadata:
  name: my-apps
spec:
  cmds:
    - kubectl apply -f ns.yaml
    - kubectl apply -f nginx.yaml
---
apiVersion: sealer.io/v2
kind: Cluster
metadata:
  name: my-cluster
spec:
  hosts:
    - ips:
        - 172.16.83.189
      roles:
        - master
      ssh: { }
  image: my-app:v1
  ssh:
    passwd: "password"
    pk: /root/.ssh/id_rsa
    port: "22"
    user: root
```

`sealer run -f Clusterfile.yaml`

this will only execute `ApplicationSpec.Cmds`: "kubectl apply -f ns.yaml" and "kubectl apply -f nginx.yaml".

#### overwrite image launch apps

```yaml
apiVersion: sealer.io/v2
kind: Application
metadata:
  name: my-apps
spec:
  launchApps:
    - app1
    - app2
---
apiVersion: sealer.io/v2
kind: Cluster
metadata:
  name: my-cluster
spec:
  hosts:
    - ips:
        - 172.16.83.189
      roles:
        - master
      ssh: { }
  image: my-app:v1
  ssh:
    passwd: "password"
    pk: /root/.ssh/id_rsa
    port: "22"
    user: root
```

`sealer run -f Clusterfile.yaml`

this will only launch two apps with its default launch cmds defined from kubefile: "app1","app2"

#### overwrite app launch apps

```yaml
apiVersion: sealer.io/v2
kind: Application
metadata:
  name: my-apps
spec:
  launchApps:
    - app1
    - app2
  configs:
    - name: app2
      launch:
        cmds:
          - kubectl apply -f app2.yaml
---
apiVersion: sealer.io/v2
kind: Cluster
metadata:
  name: my-cluster
spec:
  hosts:
    - ips:
        - 172.16.83.189
      roles:
        - master
      ssh: { }
  image: my-app:v1
  ssh:
    passwd: "password"
    pk: /root/.ssh/id_rsa
    port: "22"
    user: root
```

`sealer run -f Clusterfile.yaml`

this will only launch two apps ("app1","app2"):

* for "app1": use its default launch cmds defined from kubefile.
* for "app2": overwrite its default launch cmds as "kubectl apply -f app2.yaml".

#### overwrite app files

currently, we support below strategy for app modification.

* "overwrite": overwrite strategy will overwrite the FilePath with the Data.
* "merge": merge strategy will merge the FilePath with the Data, and only yaml files format are supported.

example:

```yaml
apiVersion: sealer.io/v2
kind: Application
metadata:
  name: my-apps
spec:
  launchApps:
    - nginx
    - yamlapp
    - mixedapp
  configs:
    - name: mixedapp
      files:
        - path: rediscert
          strategy: "overwrite"
          data: |
            redis-user: root
            redis-passwd: xxx
    - name: yamlapp
      files:
        - path: merge.yaml
          strategy: "merge"
          data: |
            data:
              test-key: test-key
            metadata:
               namespace: test-namespace
---
apiVersion: sealer.io/v2
kind: Cluster
metadata:
  name: my-cluster
spec:
  hosts:
    - ips:
        - 172.16.26.162
      roles:
        - master
      ssh: {}
  image: abc:v1
  ssh:
    passwd: xxxxxx
    pk: /root/.ssh/id_rsa
    port: "22"
    user: root
```

then we can apply this application config through `sealer apply`.

for "mixedapp", overwrite data to "rediscert" file:

```yaml
[root@iZbp1chh98quny8r8r71bhZ]# cat /var/lib/sealer/data/my-cluster/rootfs/application/apps/mixedapp/rediscert
redis-user: root
redis-passwd: xxx
```

for "yamlapp", will merge data to "merge.yaml" file:

before:

```yaml
[root@iZbp1chh98quny8r8r71bhZ]# cat merge.yaml
apiVersion: v1
data:
  key1: myConfigMap1
kind: ConfigMap
metadata:
  name: myConfigMap1
---
apiVersion: v1
data:
  key2: myConfigMap2
kind: ConfigMap
metadata:
  name: myConfigMap2
```

after:

```yaml
[root@iZbp1chh98quny8r8r71bhZ]# cat /var/lib/sealer/data/my-cluster/rootfs/application/apps/yamlapp/merge.yaml
apiVersion: v1
data:
    key1: myConfigMap1
    test-key: test-key
kind: ConfigMap
metadata:
    name: myConfigMap1
    namespace: test-namespace
---
apiVersion: v1
data:
    key2: myConfigMap2
    test-key: test-key
kind: ConfigMap
metadata:
    name: myConfigMap2
    namespace: test-namespace
```