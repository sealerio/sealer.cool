## sealer

A tool to build, share and run any distributed applications.

### Synopsis

sealer is a tool to seal application's all dependencies and Kubernetes into ClusterImage by Kubefile, distribute this
application anywhere via ClusterImage, and run it within any cluster with Clusterfile in one command.

### Options

```
      --color string               set the log color mode, the possible values can be [never always] (default "always")
      --config string              config file of sealer tool (default is $HOME/.sealer.json)
  -d, --debug                      turn on debug mode
  -h, --help                       help for sealer
      --hide-path                  hide the log path
      --hide-time                  hide the log time
      --log-to-file                write log message to disk
  -q, --quiet                      silence the usage when fail
      --remote-logger-url string   remote logger url, if not empty, will send log to this url
      --task-name string           task name which will embedded in the remote logger header, only valid when --remote-logger-url is set
  -t, --toggle                     Help message for toggle
```

### SEE ALSO

* [sealer build](image/sealer_build.md)     - build a ClusterImage from a Kubefile
* [sealer cert](cluster/sealer_cert.md)     - Update Kubernetes API server's cert
* [sealer delete](cluster/sealer_delete.md)     - delete an existing cluster
* [sealer images](image/sealer_images.md)     - list all ClusterImages on the local node
* [sealer inspect](image/sealer_inspect.md)     - print the image information or Clusterfile
* [sealer join](cluster/sealer_join.md)     - join new master or worker node to specified cluster
* [sealer load](image/sealer_load.md)     - load a ClusterImage from a tar file
* [sealer login](image/sealer_login.md)     - login image registry
* [sealer logout](image/sealer_logout.md)     - logout from image registry
* [sealer manifest](image/sealer_manifest.md)     - manipulate manifest lists
* [sealer pull](image/sealer_pull.md)     - pull ClusterImage from a registry to local
* [sealer push](image/sealer_push.md)     - push ClusterImage to remote registry
* [sealer rmi](image/sealer_rmi.md)     - remove local images
* [sealer run](cluster/sealer_run.md)     - start to run a cluster from a ClusterImage
* [sealer run-app](cluster/sealer_run-app.md)     - start to run an application cluster image
* [sealer save](image/sealer_save.md)     - save ClusterImage to a tar file
* [sealer scale-up](cluster/sealer_scale-up.md)     - scale-up new master or worker node to specified cluster
* [sealer tag](image/sealer_tag.md)     - create one or more tags for local ClusterImage
 
