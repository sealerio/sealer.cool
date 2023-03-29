# sealer

A tool to build, share and run any distributed applications.

## Synopsis

sealer is a tool to seal application's all dependencies and Kubernetes into Sealer Image by Kubefile, distribute this
application anywhere via Sealer Image, and run it within any cluster with Clusterfile in one command.

## Options

```
      --color string               set the log color mode, the possible values can be [never always] (default "always")
      --config string              config file of sealer tool (default is $HOME/.sealer.json)
  -d, --debug                      turn on debug mode
  -h, --help                       help for sealer
      --hide-path                  hide the log path
      --hide-time                  hide the log time
      --log-to-file                write log message to disk
  -q, --quiet                      silence the usage when fail
      --remote-logger-url string   remote logger url, if not empty, will send log to this url
      --task-name string           task name which will embedded in the remote logger header, only valid when --remote-logger-url is set
  -t, --toggle                     Help message for toggle
```

## SEE ALSO

* [sealer cluster](cluster/cluster.md)     - cluster module command line
* [sealer image](image/image.md)     - image module command line
* [sealer alpha](alpha/sealer_alpha.md)     - sealer experimental sub-commands
