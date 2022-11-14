## sealer rmi

remove local images

```
sealer rmi [flags]
```

### Examples

```

  sealer rmi registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8

prune dangling images:
  sealer rmi --prune/-p

force removal of the image and any containers using the image:
  sealer rmi registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8 --force/-f


```

### Options

```
  -f, --force   force removal of the image and any containers using the image
  -h, --help    help for rmi
  -p, --prune   prune dangling images
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

