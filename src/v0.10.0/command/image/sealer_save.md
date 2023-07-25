# sealer save

save Sealer Image to a tar file

## Synopsis

sealer save -o [output file name] [image name]

```
sealer save [flags]
```

## Examples

```

save kubernetes:v1 image to kubernetes.tar file:

  sealer save -o kubernetes.tar kubernetes:v1
```

## Options

```
      --compress         Compress tarball image layers when saving to a directory using the 'dir' transport. (default is same compression type as source)
      --format string    Save image to oci-archive, oci-dir (directory with oci manifest type), docker-archive, docker-dir (directory with v2s2 manifest type) (default "oci-archive")
  -h, --help             help for save
  -o, --output string    Write image to a specified file
      --tmp-dir string   set temporary directory when save image. if not set, use system`s temporary directory
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

* [sealer build]( sealer_build.md)     - build a Sealer Image from a Kubefile
* [sealer images]( sealer_images.md)     - list all Sealer Images on the local node
* [sealer inspect]( sealer_inspect.md)     - print the image information or Clusterfile
* [sealer load]( sealer_load.md)     - load a Sealer Image from a tar file
* [sealer login]( sealer_login.md)     - login image registry
* [sealer logout]( sealer_logout.md)     - logout from image registry
* [sealer pull]( sealer_pull.md)     - pull Sealer Image from a registry to local
* [sealer push]( sealer_push.md)     - push Sealer Image to remote registry
* [sealer rmi]( sealer_rmi.md)     - remove local images
* [sealer save]( sealer_save.md)     - save Sealer Image to a tar file
* [sealer tag]( sealer_tag.md)     - create one or more tags for local Sealer Image
