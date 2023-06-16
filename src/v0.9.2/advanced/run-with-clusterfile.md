# Run with clusterfile

## For kubernetes

see [clusterfile](../concept/clusterfile.md)

## For k0s

Now sealer just support to run k0s cluster with default configuration.

```yaml
apiVersion: sealer.io/v2
kind: Cluster
metadata:
  name: my-test-cluster
spec:
  image: docker.io/sealerio/k0s:v1-24-10-sealerio-1
  containerRuntime:
    type: containerd
  ssh:
    passwd: xxxxxx
  hosts:
    - ips: [ 10.1.0.218 ]
      roles: [ master ]
    - ips: [ 10.1.0.217,10.1.0.215,10.1.0.216 ]
      roles: [ node ]
  registry:
    localRegistry:
      ha: false #Attention HA is not support for k0s cluster in v0.9.2
```