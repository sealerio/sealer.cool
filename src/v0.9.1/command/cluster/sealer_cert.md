# sealer cert

Update Kubernetes API server's cert

## Synopsis

This command will add the new domain or IP address in cert to update cluster API server.

sealer has some default domain and IP in the cert process builtin: localhost,outbound IP address and some DNS domain which is strongly related to the apiserver CertSANs configured by kubeadm.yml.

You need to restart your API server manually after using sealer cert. Then, you can using cmd "openssl x509 -noout -text -in apiserver.crt" to check the cert details.

```
sealer cert [flags]
```

## Examples

```

The following command will generate new api server cert and key for all control-plane certificates:

  sealer cert --alt-names 39.105.169.253,sealer.cool

```

## Options

```
      --alt-names strings   add DNS domain or IP in certs, if it is already in the cert subject alternative names list, nothing will be changed
  -h, --help                help for cert
      --wait                wait for apiserver to be ready (default true)
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

* [sealer cert](sealer_cert.md)     - Update Kubernetes API server's cert
* [sealer delete](sealer_delete.md)     - delete an existing cluster
* [sealer apply](sealer_apply.md)     - apply a Kubernetes cluster via specified Clusterfile
* [sealer scale-up](sealer_scale-up.md)     - scale-up new master or worker node to specified cluster
* [sealer run](sealer_run.md)     - start to run a cluster from a Sealer Image
* [sealer upgrade](sealer_upgrade.md)     - upgrade the kubernetes version of an existing cluster from a Sealer Image