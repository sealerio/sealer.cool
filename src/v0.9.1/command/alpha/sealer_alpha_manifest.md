# sealer alpha manifest

manipulate manifest lists

## Synopsis

Creates, modifies, and pushes manifest lists

## Examples

```
sealer manifest create localhost/my-manifest
  sealer alpha manifest add localhost/my-manifest localhost/image
  sealer alpha manifest inspect localhost/my-manifest
  sealer alpha manifest push localhost/my-manifest transport:destination
  sealer alpha manifest remove localhost/my-manifest sha256:entryManifestDigest
  sealer alpha manifest delete localhost/my-manifest
```

## Options

```
  -h, --help   help for manifest
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

* [sealer alpha](sealer_alpha.md)     - sealer experimental sub-commands
* [sealer alpha manifest add](sealer_alpha_manifest_add.md)     - Add images to a manifest list
* [sealer alpha manifest create](sealer_alpha_manifest_create.md)     - Create manifest list
* [sealer alpha manifest delete](sealer_alpha_manifest_delete.md)     - Delete manifest list
* [sealer alpha manifest inspect](sealer_alpha_manifest_inspect.md)     - Display the contents of a manifest list
* [sealer alpha manifest push](sealer_alpha_manifest_push.md)     - Push a manifest list to a registry
* [sealer alpha manifest remove](sealer_alpha_manifest_remove.md)     - Remove an entry from a manifest list

