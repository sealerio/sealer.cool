# sealer alpha debug pod

Debug pod or container

```
sealer alpha debug pod [flags]
```

## Options

```
  -c, --container string   The container to be debugged.
  -h, --help               help for pod
```

## Options inherited from parent commands

```
      --check-list strings         Check items, such as network, volume.
      --color string               set the log color mode, the possible values can be [never always] (default "always")
      --config string              config file of sealer tool (default is $HOME/.sealer.json)
  -d, --debug                      turn on debug mode
  -e, --env stringToString         Environment variables to set in the container. (default [])
      --hide-path                  hide the log path
      --hide-time                  hide the log time
      --image string               Container image to use for debug container.
      --image-pull-policy string   Container image pull policy, default policy is IfNotPresent. (default "IfNotPresent")
      --log-to-file                write log message to disk
      --name string                Container name to use for debug container.
  -n, --namespace string           Namespace of Pod. (default "default")
  -q, --quiet                      silence the usage when fail
      --remote-logger-url string   remote logger url, if not empty, will send log to this url
  -i, --stdin                      Keep stdin open on the container, even if nothing is attached.
      --task-name string           task name which will embedded in the remote logger header, only valid when --remote-logger-url is set
  -t, --tty                        Allocate a TTY for the debugging container.
```

## SEE ALSO

* [sealer alpha debug](sealer_alpha_debug.md)     - Create debugging sessions for pods and nodes

