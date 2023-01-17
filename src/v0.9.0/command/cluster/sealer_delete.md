# sealer delete

delete an existing cluster

## Synopsis

delete command is used to delete part or all of existing cluster. User can delete cluster by explicitly specifying host
IP

```
sealer delete [flags]
```

## Examples

```

delete cluster node:
  sealer delete --nodes 192.168.0.1 [--force]
  sealer delete --masters 192.168.0.1 --nodes 192.168.0.2 [--force]
  sealer delete --masters 192.168.0.1-192.168.0.3 --nodes 192.168.0.4-192.168.0.6 [--force]
delete all:
  sealer delete --all [--force]

```

## Options

```
  -f, --Clusterfile string   delete a kubernetes cluster with Clusterfile
  -a, --all                  this flags is for delete the entire cluster, default is false
  -e, --env strings          set custom environment variables
      --force                We also can input an --force flag to delete cluster by force
  -h, --help                 help for delete
  -m, --masters string       reduce Count or IPList to masters
  -n, --nodes string         reduce Count or IPList to nodes
  -p, --prune                this flags is for delete all cluster rootfs, default is true (default true)
```

## Options inherited from parent commands

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

## SEE ALSO

* [sealer cert](sealer_cert.md)     - Update Kubernetes API server's cert
* [sealer delete](sealer_delete.md)     - delete an existing cluster
* [sealer apply](sealer_apply.md)     - apply a Kubernetes cluster via specified Clusterfile
* [sealer scale-up](sealer_scale-up.md)     - scale-up new master or worker node to specified cluster
* [sealer run](sealer_run.md)     - start to run a cluster from a Sealer Image