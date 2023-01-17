# sealer alpha debug

Create debugging sessions for pods and nodes

## Options

```
      --check-list strings         Check items, such as network, volume.
  -e, --env stringToString         Environment variables to set in the container. (default [])
  -h, --help                       help for debug
      --image string               Container image to use for debug container.
      --image-pull-policy string   Container image pull policy, default policy is IfNotPresent. (default "IfNotPresent")
      --name string                Container name to use for debug container.
  -n, --namespace string           Namespace of Pod. (default "default")
  -i, --stdin                      Keep stdin open on the container, even if nothing is attached.
  -t, --tty                        Allocate a TTY for the debugging container.
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
* [sealer alpha debug clean](sealer_alpha_debug_clean.md)     - Clean the debug container od pod
* [sealer alpha debug node](sealer_alpha_debug_node.md)     - Debug node
* [sealer alpha debug pod](sealer_alpha_debug_pod.md)     - Debug pod or container
* [sealer alpha debug show-images](sealer_alpha_debug_show-images.md)     - List default images

