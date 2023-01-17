# sealer alpha

sealer experimental sub-commands

## Synopsis

Alpha command of sealer is used to provide functionality incubation from immature to mature. Each function will
experience a growing procedure. Alpha command policy calls on end users to experience alpha functionality as early as
possible, and actively feedback the experience results to sealer community, and finally cooperate to promote function
from incubation to graduation.

Please file an issue at [sealer issue list](https://github.com/sealerio/sealer/issues) when you have any feedback on
alpha commands.

## Options

```
  -h, --help   help for alpha
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

* [sealer alpha check](sealer_alpha_check.md)     - check the state of cluster
* [sealer alpha debug](sealer_alpha_debug.md)     - Create debugging sessions for pods and nodes
* [sealer alpha exec](sealer_alpha_exec.md)     - Exec a shell command or script on a specified node
* [sealer alpha host-alias](sealer_alpha_host-alias.md)     - set host-alias for hosts via specified Clusterfile
* [sealer alpha manifest](sealer_alpha_manifest.md)     - manipulate manifest lists
* [sealer alpha search](sealer_alpha_search.md)     - search Sealer Image in default registry

