# sealer upgrade

upgrade the kubernetes version of an existing cluster from a Sealer Image

## Synopsis

upgrade command is used to upgrade the kubernetes version of an existing cluster.
User can upgrade cluster by using specifying upgrade-image

```
sealer upgrade [flags]
```

## Examples

```
upgrade cluster by Clusterfile:
  sealer upgrade -f Clusterfile

run cluster by CLI flags:
  sealer upgrade docker.io/sealerio/kubernetes:v1.22.15

```

## Options

```
  -f, --Clusterfile string   Clusterfile path to upgrade a Kubernetes cluster
  -h, --help                 help for upgrade
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
* [sealer rollback](sealer_rollback.md)     - rollback a Kubernetes cluster via specified Clusterfile
* [sealer upgrade](sealer_upgrade.md)     - upgrade the kubernetes version of an existing cluster from a Sealer Image