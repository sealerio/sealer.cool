# sealer alpha mount

mount cluster image

## Synopsis

mount the cluster image to '/var/lib/sealer/data/overlay2' the directory and check whether the contents of the build image and rootfs are consistent in advance

```
sealer alpha mount [flags]
```

## Examples

```
  sealer alpha mount(show mount list)
  sealer alpha mount my-image
  sealer alpha mount ba15e47f5969
```

## Options

```
  -h, --help   help for mount
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

* [sealer alpha](sealer_alpha.md)	 - sealer experimental sub-commands