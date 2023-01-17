# sealer alpha exec

Exec a shell command or script on a specified node

## Synopsis

Using ssh client which is built in sealer to run shell command on the nodes filtered by cluster and cluster roles. It is
convenient for cluster administrator to do quick investigation.

```
sealer alpha exec [flags]
```

## Examples

```

Exec the default cluster node:
  sealer alpha exec "cat /etc/hosts"

specify the cluster name:
  sealer alpha exec -c my-cluster "cat /etc/hosts"

using role label to filter node and run exec cmd:
  sealer alpha exec -c my-cluster -r master,slave,node1 "cat /etc/hosts"

```

## Options

```
  -c, --cluster-name string   specify the name of cluster
  -h, --help                  help for exec
  -r, --roles strings         set role label to filter node
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

* [sealer alpha](sealer_alpha.md)     - sealer experimental sub-commands

