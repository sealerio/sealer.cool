## sealer pull

pull ClusterImage from a registry to local

```
sealer pull [flags]
```

### Examples

```

  sealer pull registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8
  sealer pull registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8 --platform linux/amd64

```

### Options

```
  -h, --help              help for pull
      --platform string   prefer OS/ARCH instead of the current operating system and architecture for choosing images (default "linux/amd64")
      --policy string     missing, always, ifnewer or never. (default "always")
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

