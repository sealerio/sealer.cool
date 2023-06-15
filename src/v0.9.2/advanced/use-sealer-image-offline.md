# Use Sealer Image Offline

## Motivations

It's common that some k8s clusters have their own private image registry, and they don't want to pull images from other registry for some reasons. This page is about how to integrate kyverno into k8s cluster, which will redirect image pull request to Specified registry.

## How to use Kyverno BaseImage

We provide official BaseImage which integrates kyverno into cluster.

| Sealer version |                            Image                             | Arch  |                              OS                              | Network plugins |     Container runtime     |
| :------------: | :----------------------------------------------------------: | :---: | :----------------------------------------------------------: | :-------------: | :-----------------------: |
|     v0.9.1     |   docker.io/sealerio/kubernetes-kyverno:v1-18-3-sealerio-1   |  x86  | CentOS/RHEL 7.5<br/>CentOS/RHEL 7.6<br/>CentOS/RHEL 7.7<br/>CentOS/RHEL 7.8<br/>CentOS/RHEL 7.9 |     calico      | Official docker v19.03.15 |
|     v0.9.1     |   docker.io/sealerio/kubernetes-kyverno:v1-20-4-sealerio-1   |  x86  | CentOS/RHEL 7.5<br/>CentOS/RHEL 7.6<br/>CentOS/RHEL 7.7<br/>CentOS/RHEL 7.8<br/>CentOS/RHEL 7.9 |     calico      | Official docker v19.03.15 |
|     v0.9.1     |  docker.io/sealerio/kubernetes-kyverno:v1-22-15-sealerio-1   |  x86  | CentOS/RHEL 7.5<br/>CentOS/RHEL 7.6<br/>CentOS/RHEL 7.7<br/>CentOS/RHEL 7.8<br/>CentOS/RHEL 7.9 |     calico      | Official docker v19.03.15 |
|     v0.9.1     | docker.io/sealerio/kubernetes-kyverno-arm64:v1-18-3-sealerio-1 | arm64 | CentOS/RHEL 7.5<br/>CentOS/RHEL 7.6<br/>CentOS/RHEL 7.7<br/>CentOS/RHEL 7.8<br/>CentOS/RHEL 7.9 |     calico      | Official docker v19.03.15 |
|     v0.9.1     | docker.io/sealerio/kubernetes-kyverno-arm64:v1-20-4-sealerio-1 | arm64 | CentOS/RHEL 7.5<br/>CentOS/RHEL 7.6<br/>CentOS/RHEL 7.7<br/>CentOS/RHEL 7.8<br/>CentOS/RHEL 7.9 |     calico      | Official docker v19.03.15 |
|     v0.9.1     | docker.io/sealerio/kubernetes-kyverno-arm64:v1-22-15-sealerio-1 | arm64 | CentOS/RHEL 7.5<br/>CentOS/RHEL 7.6<br/>CentOS/RHEL 7.7<br/>CentOS/RHEL 7.8<br/>CentOS/RHEL 7.9 |     calico      | Official docker v19.03.15 |

Note that these contains no docker images other than those necessary to run a k8s cluster, so if you want to use these cloud image, and you also need other docker images(such as `nginx`) to run a container, you need to cache the docker images to your private registry.

Of course `sealer` can help you do this,use `nginx` and `kubernetes-kyverno:v1-22-15-sealerio-1` as an example.

### step1: create the build content

We prepare the following `nginx.yaml` file.

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
          image: docker.io/library/nginx:latest
          ports:
            - containerPort: 80
```

**Note: The address of the image to be cached needs to be filled in completely, image address such as `nginx:latest` are temporarily not supported now.**

Create a `kyvernoNginxBuild` directory with four files: the `nginx.yaml` and a `Kubefile` which content is following:

```shell
FROM docker.io/sealerio/kubernetes-kyverno:v1-22-15-sealerio-1
APP nginx local://nginx.yaml
APPCMDS kyverno ["sh redirect-registry.sh -r sea.hub:5000"]
LAUNCH ["calico", "kyverno", "nginx"]
```

### step2: build the image

Supposing you are at the `kyvernoNginxBuild` directory, please execute `sealer build --no-cache -t kubernetes-kyverno-nginx:v1 .`

### step3: run the image

Use the `sealer run` command to deploy:

`sealer run localhost/kubernetes-kyverno-nginx:v1 -m 10.0.0.238 -n 10.0.0.239 10.0.0.240 -p Sealer.io@123`

## How to use Kyverno AppImage

We also provide official Kyverno AppImage, you can use Kyverno AppImage when your k8s cluster don't integrate with kyverno.

| Sealer version |                         Image                         |
| :------------: | :---------------------------------------------------: |
|     v0.9.1     | docker.io/sealerio/scratch-kyverno:v1-6-3-sealerio-1 |
|     v0.9.1     | docker.io/sealerio/scratch-kyverno:v1-7-5-sealerio-1 |
|     v0.9.1     | docker.io/sealerio/scratch-kyverno:v1-8-5-sealerio-1 |

Due to kyverno's compatibility requirements with kubernetes (shown below), we need to pick the corresponding version of kyverno.

You can find a more detailed compatibility matrix [here](https://kyverno.io/docs/installation/#compatibility-matrix).

| Kyverno Version | Kubernetes Min | Kubernetes Max |
| :-------------: | :------------: | :------------: |
|      1.6.x      |      1.16      |      1.23      |
|      1.7.x      |      1.21      |      1.23      |
|      1.8.x      |      1.23      |      1.25      |

\* Due to a known issue with Kubernetes 1.23.0-1.23.2, support for 1.23 begins at 1.23.3.

Note that these contains no docker images other than kyverno, so if you want to use these, and you also need other docker images(such as `nginx`) to run a container, you need to cache the docker images to your private registry.

Of course `sealer` can help you do this,use `nginx` and `docker.io/sealerio/scratch-kyverno:v1-7-5-sealerio-1` as an example.

### step1: create the build content

We prepare the following `nginx.yaml` file.

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
          image: docker.io/library/nginx:latest
          ports:
            - containerPort: 80
```

**Note: The address of the image to be cached needs to be filled in completely, image address such as `nginx:latest` are temporarily not supported now.**

Create a `kyvernoNginxBuild` directory with four files: the `nginx.yaml` and a `Kubefile` which content is following:

```shell
FROM docker.io/sealerio/scratch-kyverno:v1-7-5-sealerio-1
APP nginx local://nginx.yaml
APPCMDS kyverno ["sh redirect-registry.sh -r sea.hub:5000"]
LAUNCH ["kyverno", "nginx"]
```

### step2: build the image

Supposing you are at the `kyvernoNginxBuild` directory, please execute `sealer build --type=app-installer --no-cache -t kyverno-nginx:v1 .`

### step3: run the image

**Note: If your cluster already has kyverno installed, please uninstall the previous kyverno first.**

Use the `sealer run` command to deploy:

`sealer run localhost/kyverno-nginx:v1`

## How to build Kyverno BaseImage

The following is a sequence steps of building kyverno build-in sealer image.

### step1: choose a base image

Choose a base image which can create a k8s cluster with at least one master node and one work node. You can find the Official docker version of the image to build the kyverno base image: [here](http://sealer.cool/docs/sealer-images/cluster-images.html#k8s-cluster-image-list)

To demonstrate the workflow, we use `docker.io/sealerio/kubernetes:v1.22.15-sealerio-2-official-docker-1`. You can get the same image by executing `sealer pull docker.io/sealerio/kubernetes:v1.22.15-sealerio-2-official-docker-1`.

### step2: get the kyverno install yaml

Due to kyverno's compatibility requirements with kubernetes (shown below), we need to pick the corresponding version of kyverno based on the version of the base image we have selected.

You can find a more detailed compatibility matrix [here](https://kyverno.io/docs/installation/#compatibility-matrix).

| Kyverno Version | Kubernetes Min | Kubernetes Max |
| :-------------: | :------------: | :------------: |
|      1.6.x      |      1.16      |      1.23      |
|      1.7.x      |      1.21      |      1.23      |
|      1.8.x      |      1.23      |      1.25      |

\* Due to a known issue with Kubernetes 1.23.0-1.23.2, support for 1.23 begins at 1.23.3.

1.6.x: <https://raw.githubusercontent.com/kyverno/kyverno/release-1.6/config/release/install.yaml>

1.7.x: <https://raw.githubusercontent.com/kyverno/kyverno/release-1.7/config/release/install.yaml>

1.8.5: <https://github.com/kyverno/kyverno/releases/download/v1.8.5/install.yaml>

You can also find the `install.yaml` for the version of kyverno you want here: <https://github.com/kyverno/kyverno/releases>

Because we are using a base image with Kubernetes version `v1.22.15`, we can use `1.6.x` or `1.7.x` versions of kyverno.

### step3: create a ClusterPolicy

Create a yaml with the following content:

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: replace-image-registry
spec:
  background: false
  rules:
    - name: replace-image-registry-pod-containers
      match:
        any:
        - resources:
            kinds:
            - Pod
      preconditions:
        all:
        - key: "{{request.operation || 'BACKGROUND'}}"
          operator: AnyIn
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
                image: "{{ regex_replace_all_literal('^[^/]+', '{{element.image}}', 'sea.hub:5000' )}}"
    - name: replace-image-registry-pod-initcontainers
      match:
        any:
        - resources:
            kinds:
            - Pod
      preconditions:
        all:
        - key: "{{request.operation || 'BACKGROUND'}}"
          operator: AnyIn
          value:
          - CREATE
          - UPDATE
        - key: "{{ request.object.spec.initContainers[] || '' | length(@) }}"
          operator: GreaterThanOrEquals
          value: 1
      mutate:
        foreach:
        - list: "request.object.spec.initContainers"
          patchStrategicMerge:
            spec:
              initContainers:
              - name: "{{ element.name }}"
                image: "{{ regex_replace_all_literal('^[^/]+', '{{element.image}}', 'sea.hub:5000' )}}"
```

This ClusterPolicy will redirect image pull request to private registry `sea.hub:5000`, and we can name this file as `redirect-registry`.

### step4: create a shell script

we use this script to change the address of the mirror repository in `install.yaml` and `redirect-registry`, install kyverno and create policy.

```shell
#!/bin/bash

function usage {
   cat << EOF
Usage: redirect-registry.sh -r <your private registry>
EOF
   exit 1
}

registry="sea.hub:5000"

if [ $# -gt 2 ]; then
  usage;
elif [ $# -eq 2 ]; then
  if [ "$1" != "-r" ]; then
    usage
  fi
  registry=$2
fi

sed -i "s/ghcr.io/${registry}/g" ./install.yaml
sed -i "s/sea.hub:5000/${registry}/g" ./redirect-registry
cat >>install.yaml<<EOF
      tolerations:
      - key: "node-role.kubernetes.io/master"
        operator: "Exists"
        effect: "NoSchedule"
      affinity:
        nodeAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 1
            preference:
              matchExpressions:
              - key: node-role.kubernetes.io/master
                operator: In
                values:
                - ""
EOF

kubectl create -f install.yaml
kubectl create -f redirect-registry

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

I named this file `redirect-registry.sh`.

### step5: create the build content

Create a `kyvernoBuild` directory with four files: the `install.yaml` in step 2, `redirect-registry` in step 3, `redirect-registry.sh` in step4 and a `Kubefile` which content is following:

```shell
FROM docker.io/sealerio/kubernetes:v1.22.15-sealerio-2-official-docker-1
LABEL "app.alpha.sealer.io/image-policy-plugin"="kyverno"
COPY install.yaml application/apps/kyverno/
COPY redirect-registry application/apps/kyverno/
APP kyverno local://redirect-registry.sh
APPCMDS kyverno ["sh redirect-registry.sh -r sea.hub:5000"]
LAUNCH ["calico", "kyverno"]
```

If the private repository you want to use is not `sea.hub:5000`, you will also need to change `sea.hub:5000` to the private repository address you want to use.

### step6: build the image

Supposing you are at the `kyvernoBuild` directory, please execute `sealer build --no-cache -t kubernetes-kyverno:v1.22.15 .`

## How to build Kyverno AppImage

### Step1: get the kyverno install yaml

Due to kyverno's compatibility requirements with kubernetes (shown below), we need to pick the corresponding version of kyverno based on the version of the base image we have selected.

| Kyverno Version | Kubernetes Min | Kubernetes Max |
| :-------------: | :------------: | :------------: |
|      1.6.x      |      1.16      |      1.23      |
|      1.7.x      |      1.21      |      1.23      |
|      1.8.x      |      1.23      |      1.25      |

\* Due to a known issue with Kubernetes 1.23.0-1.23.2, support for 1.23 begins at 1.23.3.

1.6.x: <https://raw.githubusercontent.com/kyverno/kyverno/release-1.6/config/release/install.yaml>

1.7.x: <https://raw.githubusercontent.com/kyverno/kyverno/release-1.7/config/release/install.yaml>

1.8.5: <https://github.com/kyverno/kyverno/releases/download/v1.8.5/install.yaml>

You can also find the `install.yaml` for the version of kyverno you want here: <https://github.com/kyverno/kyverno/releases>

Because we are using a base image with Kubernetes version `v1.22.15`, we can use `1.6.x` or `1.7.x` versions of kyverno.

### Step2: create a ClusterPolicy

Create a yaml with the following content:

```yaml
apiVersion: kyverno.io/v1
kind: ClusterPolicy
metadata:
  name: replace-image-registry
spec:
  background: false
  rules:
    - name: replace-image-registry-pod-containers
      match:
        any:
        - resources:
            kinds:
            - Pod
      preconditions:
        all:
        - key: "{{request.operation || 'BACKGROUND'}}"
          operator: AnyIn
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
                image: "{{ regex_replace_all_literal('^[^/]+', '{{element.image}}', 'sea.hub:5000' )}}"
    - name: replace-image-registry-pod-initcontainers
      match:
        any:
        - resources:
            kinds:
            - Pod
      preconditions:
        all:
        - key: "{{request.operation || 'BACKGROUND'}}"
          operator: AnyIn
          value:
          - CREATE
          - UPDATE
        - key: "{{ request.object.spec.initContainers[] || '' | length(@) }}"
          operator: GreaterThanOrEquals
          value: 1
      mutate:
        foreach:
        - list: "request.object.spec.initContainers"
          patchStrategicMerge:
            spec:
              initContainers:
              - name: "{{ element.name }}"
                image: "{{ regex_replace_all_literal('^[^/]+', '{{element.image}}', 'sea.hub:5000' )}}"
```

This ClusterPolicy will redirect image pull request to private registry `sea.hub:5000`, and we can name this file as `redirect-registry`.

### Step3: create a shell script

we use this script to change the address of the mirror repository in `install.yaml` and `redirect-registry`, install kyverno and create policy.

```shell
#!/bin/bash

function usage {
   cat << EOF
Usage: redirect-registry.sh -r <your private registry>
EOF
   exit 1
}

registry="sea.hub:5000"

if [ $# -gt 2 ]; then
  usage;
elif [ $# -eq 2 ]; then
  if [ "$1" != "-r" ]; then
    usage
  fi
  registry=$2
fi

sed -i "s/ghcr.io/${registry}/g" ./install.yaml
sed -i "s/sea.hub:5000/${registry}/g" ./redirect-registry
cat >>install.yaml<<EOF
      tolerations:
      - key: "node-role.kubernetes.io/master"
        operator: "Exists"
        effect: "NoSchedule"
      affinity:
        nodeAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 1
            preference:
              matchExpressions:
              - key: node-role.kubernetes.io/master
                operator: In
                values:
                - ""
EOF

kubectl create -f install.yaml
kubectl create -f redirect-registry

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

I named this file `redirect-registry.sh`.

### Step4: create the build content

Create a `kyvernoAppImageBuild` directory with four files: the `install.yaml` in step 1, `redirect-registry` in step 2, `redirect-registry.sh` in step3 and a `Kubefile` which content is following:

```shell
FROM scratch
LABEL "app.alpha.sealer.io/image-policy-plugin"="kyverno"
COPY install.yaml application/apps/kyverno/
COPY redirect-registry application/apps/kyverno/
APP kyverno local://redirect-registry.sh
APPCMDS kyverno ["sh redirect-registry.sh -r sea.hub:5000"]
LAUNCH ["kyverno"]
```

If the private repository you want to use is not `sea.hub:5000`, you will also need to change `sea.hub:5000` to the private repository address you want to use.

### Step5: build the image

Supposing you are at the `kyvernoAppImageBuild` directory, please execute `sealer build --no-cache --type=app-installer -t scratch-kyverno:v1.7.5 .`

## How to build Kyverno BaseImage to make Kyverno highly available

coming soon...