## sealer save

save ClusterImage to a tar file

### Synopsis

sealer save -o [output file name] [image name]

```
sealer save [flags]
```

### Examples

```

save kubernetes:v1.19.8 image to kubernetes.tar file:

  sealer save -o kubernetes.tar kubernetes:v1.19.8
```

### Options

```
      --compress        Compress tarball image layers when saving to a directory using the 'dir' transport. (default is same compression type as source)
      --format string   Save image to oci-archive, oci-dir (directory with oci manifest type), docker-archive, docker-dir (directory with v2s2 manifest type) (default "oci-archive")
  -h, --help            help for save
  -o, --output string   Write image to a specified file
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

