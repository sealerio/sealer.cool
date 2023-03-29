# sealer alpha manifest remove

Remove an entry from a manifest list

## Synopsis

Removes an image from a manifest list.

```
sealer alpha manifest remove [flags]
```

## Examples

```
sealer alpha manifest remove mylist:v1.11 sha256:15352d97781ffdf357bf3459c037be3efac4133dc9070c2dce7eca7c05c3e736
```

## Options

```
  -h, --help   help for remove
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

* [sealer alpha manifest](sealer_alpha_manifest.md)     - manipulate manifest lists

