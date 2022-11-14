## sealer scale-up

scale-up new master or worker node to specified cluster

### Synopsis

scale-up command is used to scale-up master or node to the existing cluster.
User can scale-up cluster by explicitly specifying host IP

```
sealer scale-up [flags]
```

### Examples

```

scale-up cluster:
  sealer join --masters 192.168.0.1 --nodes 192.168.0.2 -p Sealer123
  sealer join --masters 192.168.0.1-192.168.0.3 --nodes 192.168.0.4-192.168.0.6 -p Sealer123

```

### Options

```
  -e, --env strings        set custom environment variables
  -h, --help               help for scale-up
  -m, --masters string     set Count or IPList to masters
  -n, --nodes string       set Count or IPList to nodes
  -p, --passwd string      set cloud provider or baremetal server password
      --pk string          set baremetal server private key (default "/root/.ssh/id_rsa")
      --pk-passwd string   set baremetal server private key password
      --port uint16        set the sshd service port number for the server (default port: 22) (default 22)
  -u, --user string        set baremetal server username (default "root")
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

