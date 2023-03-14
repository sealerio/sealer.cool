# Run sealer in non-root mode

## Prerequisites

Before running Sealer in non-root mode, please make sure the following steps are satisfied:

### Check `sshd_config` permissions

You need to change the permissions of the `sshd_config` file before installing Sealer using sudo. You can do this by using the following command:

```bash
sealer@cubmaster01$ sudo chmod 644 /etc/ssh/sshd_config
```

This will fix the remote read permission issue.

### Check `sudoers` rules

Before running Sealer in the cluster, you need to assign passwordless login permissions to the users on **all nodes**. You can edit the `/etc/sudoers` file to achieve this purpose. The file contains sudo user and group rules that allow specific users (like sealer) or groups to run commands as a superuser while executing the commands.

```bash
sealer ALL=(ALL) NOPASSWD: ALL
```

This will allow the user named sealer to run commands as a superuser without entering a password.

## Run Sealer image

To run the Sealer image, use the following command:

```bash
sealer@cubmaster01$ sudo sealer run docker.io/sealerio/kubernetes:v1.22.15 --masters 10.0.0.245 --nodes 10.0.0.246 --nodes 10.0.0.247 --user sealer  --passwd  '1234$a'
```

Here, the `--masters` parameter specifies the IP addresses of the Kubernetes master nodes that Sealer will manage, the `--nodes` parameter specifies the IP addresses of the Kubernetes worker nodes that Sealer will manage, the `--user` parameter specifies the username that Sealer will use, and the `--passwd` parameter specifies the password that Sealer will use.