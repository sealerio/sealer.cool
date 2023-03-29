# sealer alpha manifest add

Add images to a manifest list

## Synopsis

Adds an image to a manifest list.

```
sealer alpha manifest add [flags]
```

## Examples

```
sealer alpha manifest add mylist:v1.11 image:v1.11-amd64
  sealer alpha manifest add mylist:v1.11 transport:imageName
```

## Options

```
      --all                     add all of the list's images if the image is a list
      --annotation annotation   set an annotation for the specified image
      --arch architecture       override the architecture of the specified image
  -h, --help                    help for add
      --os OS                   override the OS of the specified image
      --os-features features    override the OS features of the specified image
      --os-version version      override the OS version of the specified image
      --variant variant         override the variant of the specified image
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

