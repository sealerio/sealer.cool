# ARM集群镜像

下载sealer二进制文件，例如下载v0.5.0版本：

```shell script
wget https://github.com/sealerio/sealer/releases/download/v0.5.0/sealer-v0.5.0-linux-arm64.tar.gz
```

## 在ARM平台上运行集群

只需使用ARM集群镜像 `kubernetes-arm64:v1.19.7`:

```shell script
sealer run kubernetes-arm64:v1.19.7 --master 192.168.0.3 --passwd xxx
```
