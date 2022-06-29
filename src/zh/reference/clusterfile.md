# Clusterfile定义

安装到现有服务器，提供程序是`BAREMETAL`:

```yaml
apiVersion: sealer.aliyun.com/v1alpha1
kind: Cluster
metadata:
  name: my-cluster
spec:
  image: registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8
  provider: BAREMETAL
  ssh: # 主机 ssh 配置
    # ssh登录密码. 如果使用密钥，则无需设置密码
    passwd:
    # sh私钥文件的绝对路径，例如, /root/.ssh/id_rsa
    pk: xxx
    # ssh 私钥文件密码
    pkPasswd: xxx
    # ssh 登录用户
    user: root
  network:
    podCIDR: 100.64.0.0/10
    svcCIDR: 10.96.0.0/22
  certSANS:
    - aliyun-inc.com
    - 10.0.0.2
  masters:
    ipList:
     - 172.20.125.1
     - 172.20.126.2
     - 172.20.126.3
  nodes:
    ipList:
     - 172.20.126.7
     - 172.20.126.8
     - 172.20.126.9
```

自动申请阿里云服务器进行安装，提供者为`ALI_CLOUD`。或者使用容器进行安装，提供者是`CONTAINER`:

```yaml
apiVersion: sealer.aliyun.com/v1alpha1
kind: Cluster
metadata:
  name: my-cluster
spec:
  image: registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8 # 镜像名称
  provider: ALI_CLOUD # OR CONTAINER
  ssh: # 自定义主机 ssh 配置
    passwd: xxx
    pk: xxx
    pkPasswd: xxx
    user: root
  network:
    podCIDR: 100.64.0.0/10
    svcCIDR: 10.96.0.0/22
  certSANS:
    - aliyun-inc.com
    - 10.0.0.2
  masters: # 可以指定服务器数量、系统盘、数据盘、cpu和内存大小
    cpu: 4
    memory: 8
    count: 3
    systemDisk: 100
    dataDisks:
    - 100
  nodes:
    cpu: 5
    memory: 8
    count: 3
    systemDisk: 100
    dataDisks:
    - 100
  status: {}
```