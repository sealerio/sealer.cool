# sealer alpha umount

umount cluster image

## Synopsis

umount the cluster image and delete the mount directory

```
sealer alpha umount [flags]
```

## Examples

```
  sealer alpha umount containerID
  sealer alpha umount --all
```

## Options

```
  -a, --all    umount all cluster image directories
  -h, --help   help for umount
```

## Options inherited from parent commands

```
      --color string               set the log color mode, the possible values can be [never always] (default "always")
      --config string              config file of sealer tool (default is $HOME/.sealer.json)
  -d, --debug                      turn on debug mode
      --hide-path                  hide the log path
      --hide-time                  hide the log time
      --log-to-file                write log message to disk (default true)
  -q, --quiet                      silence the usage when fail
      --remote-logger-url string   remote logger url, if not empty, will send log to this url
      --task-name string           task name which will embedded in the remote logger header, only valid when --remote-logger-url is set
```

## SEE ALSO

* [sealer alpha](sealer_alpha.md)	 - sealer experimental sub-commands