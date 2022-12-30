# sealer build

build a Sealer Image from a Kubefile

## Synopsis

build command is used to generate a Sealer Image from specified Kubefile. It organizes the specified Kubefile and input
building context, and builds a brand new Sealer Image.

```
sealer build [flags] PATH
```

## Examples

```
the current path is the context path, default build type is lite and use build cache
build:
  sealer build -f Kubefile -t my-kubernetes:1.19.8 .
build without cache:
  sealer build -f Kubefile -t my-kubernetes:1.19.8 --no-cache .
build with args:
  sealer build -f Kubefile -t my-kubernetes:1.19.8 --build-arg MY_ARG=abc,PASSWORD=Sealer123 .
build with image type:
  sealer build -f Kubefile -t my-kubernetes:1.19.8 --type=app-installer .
  sealer build -f Kubefile -t my-kubernetes:1.19.8 --type=kube-installer(default) .
  app-installer type image will not install kubernetes.
build multi-platform image:
	sealer build -f Kubefile -t my-kubernetes:1.19.8 --platform linux/amd64,linux/arm64

```

## Options

```
      --annotation strings              add annotations for image. Format like --annotation key=[value]
      --build-arg strings               set custom build args
  -f, --file string                     Kubefile filepath (default "Kubefile")
  -h, --help                            help for build
      --image-list pathname             pathname of imageList filepath, if set, sealer will read its content and download extra container (default "filepath")
      --image-list-with-auth pathname   pathname of imageListWithAuth.yaml filepath, if set, sealer will read its content and download extra container images to rootfs(not usually used)
      --label strings                   add labels for image. Format like --label key=[value] (default [io.sealer.version=v0.9.0])
      --no-cache                        do not use existing cached images for building. Build from the start with a new set of cached layers.
      --platform strings                set the target platform, --platform=linux/amd64 or --platform=linux/amd64/v7. Multi-platform will be like --platform=linux/amd64,linux/amd64/v7 (default [linux/amd64])
      --pull string                     pull policy. Allow for --pull, --pull=true, --pull=false, --pull=never, --pull=always, --pull=ifnewer (default "ifnewer")
  -t, --tag string                      specify a name for Sealer Image
      --type string                     specify the image type, --type=kube-installer, --type=app-installer, default is kube-installer (default "kube-installer")
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

