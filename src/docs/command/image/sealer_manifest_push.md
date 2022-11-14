## sealer manifest push

Push a manifest list to a registry

### Synopsis


  Pushes manifest lists to registries.

```
sealer manifest push [flags]
```

### Examples

```
sealer manifest push mylist:v1.11 transport:imageName
```

### Options

```
      --all               also push the images in the list
      --authfile string   path of the authentication file. Use REGISTRY_AUTH_FILE environment variable to override
      --cert-dir string   use certificates at the specified path to access the registry
  -f, --format string     manifest type (oci or v2s2) to attempt to use when pushing the manifest list (default is manifest type of source)
  -h, --help              help for push
      --rm                remove the manifest list if push succeeds
      --tls-verify        require HTTPS and verify certificates when accessing the registry. TLS verification cannot be used when talking to an insecure registry. (default true)
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

* [sealer manifest](sealer_manifest.md)	 - manipulate manifest lists

