## sealer login

login image registry

```
sealer login [flags]
```

### Examples

```

  sealer login registry.cn-qingdao.aliyuncs.com -u [username] -p [password]

```

### Options

```
  -h, --help              help for login
  -p, --passwd string     password for login registry
      --tls-verify        require HTTPS and verify certificates when accessing the registry. TLS verification cannot be used when talking to an insecure registry. (default true)
  -u, --username string   user name for login registry
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

