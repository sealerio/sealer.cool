## sealer inspect

print the image information or Clusterfile

```
sealer inspect [flags]
```

### Examples

```

  sealer inspect {imageName or imageID}
  sealer inspect --format '{{.OCIv1.Config.Env}}' {imageName or imageID}

```

### Options

```
  -f, --format format   use format as a Go template to format the output
  -h, --help            help for inspect
  -t, --type type       look at the item of the specified type (container or image) and name (default "image")
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

