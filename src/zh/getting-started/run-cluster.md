# 运行集群

## 在现有服务器上运行

Server ip address| 192.168.0.1 ~ 192.168.0.13
---|---
**server password**  | **sealer123**

*在本地服务器上运行 kubernetes 集群。*

```shell
sealer run kubernetes:v1.19.8 \
   -m 192.168.0.1,192.168.0.2,192.168.0.3 \
   -n 192.168.0.4,192.168.0.5,192.168.0.6 \
   -p sealer123 # ssh passwd
```

*检查集群*

```shell script
[root@iZm5e42unzb79kod55hehvZ ~]# kubectl get node
NAME                    STATUS ROLES AGE VERSION
izm5e42unzb79kod55hehvz Ready master 18h v1.19.8
izm5ehdjw3kru84f0kq7r7z Ready master 18h v1.19.8
izm5ehdjw3kru84f0kq7r8z Ready master 18h v1.19.8
izm5ehdjw3kru84f0kq7r9z Ready <none> 18h v1.19.8
izm5ehdjw3kru84f0kq7raz Ready <none> 18h v1.19.8
izm5ehdjw3kru84f0kq7rbz Ready <none> 18h v1.19.8
```

### 扩容和缩容

*使用 join 命令扩展本地服务器。*

```shell script
$ sealer join \
   --masters 192.168.0.7,192.168.0.8,192.168.0.9,192.168.0.10 \
   --nodes 192.168.0.11,192.168.0.12,192.168.0.13
# or
$ sealer join --masters 192.168.0.7-192.168.0.10 --nodes 192.168.0.11-192.168.0.13
```

*使用 delete 命令缩减本地服务器。*

```shell
$ sealer delete \
   --masters 192.168.0.7,192.168.0.8,192.168.0.9,192.168.0.10 \
   --nodes 192.168.0.11,192.168.0.12,192.168.0.13
# or
$ sealer delete --masters 192.168.0.7-192.168.0.10 --nodes 192.168.0.11-192.168.0.13
```

## 清理 Kubernetes 集群

```shell
sealer delete --all
```

如果您使用cloud模式，Sealer 还将删除基础设施资源。