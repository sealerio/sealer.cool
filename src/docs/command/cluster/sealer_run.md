## sealer run

start to run a cluster from a ClusterImage

### Synopsis

sealer run registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8 --masters [arg] --nodes [arg]

```
sealer run [flags]
```

### Examples

```

run cluster by Clusterfile: 
  sealer run -f Clusterfile

run cluster by CLI flags:
  sealer run registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.22.4 -m 172.28.80.01 -n 172.28.80.02 -p Sealer123

```

### Options

```
  -f, --Clusterfile string   Clusterfile path to run a Kubernetes cluster
      --cmd-args strings     set args for image cmd instruction
  -e, --env strings          set custom environment variables
  -h, --help                 help for run
  -m, --masters string       set count or IPList to masters
  -n, --nodes string         set count or IPList to nodes
  -p, --passwd string        set cloud provider or baremetal server password
      --pk string            set baremetal server private key (default "/root/.ssh/id_rsa")
      --pk-passwd string     set baremetal server private key password
      --port uint16          set the sshd service port number for the server (default port: 22) (default 22)
  -u, --user string          set baremetal server username (default "root")
```

### Options inherited from parent commands

```
      --color string               set the log color mode, the possible values can be [never always] (default "always")
      --config string              config file of sealer tool (default is $HOME/.sealer.json)
  -d, --debug                      turn on debug mode
      --hide-path                  hide the log path
      --hide-time                  hide the log time
      --log-to-file                write log message to disk
  -q, --quiet                      silence the usage when fail
      --remote-logger-url string   remote logger url, if not empty, will send log to this url
      --task-name string           task name which will embedded in the remote logger header, only valid when --remote-logger-url is set
```

### SEE ALSO

* [sealer](../sealer.md)	 - A tool to build, share and run any distributed applications.

