## sealer manifest

manipulate manifest lists

### Synopsis


  Creates, modifies, and pushes manifest lists

### Examples

```
sealer manifest create localhost/my-manifest
  sealer manifest add localhost/my-manifest localhost/image
  sealer manifest inspect localhost/my-manifest
  sealer manifest push localhost/my-manifest transport:destination
  sealer manifest remove localhost/my-manifest sha256:entryManifestDigest
  sealer manifest delete localhost/my-manifest
```

### Options

```
  -h, --help   help for manifest
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

* [sealer manifest add](sealer_manifest_add.md)	 - Add images to a manifest list
* [sealer manifest create](sealer_manifest_create.md)	 - Create manifest list
* [sealer manifest delete](sealer_manifest_delete.md)	 - Delete manifest list
* [sealer manifest inspect](sealer_manifest_inspect.md)	 - Display the contents of a manifest list
* [sealer manifest push](sealer_manifest_push.md)	 - Push a manifest list to a registry
* [sealer manifest remove](sealer_manifest_remove.md)	 - Remove an entry from a manifest list

