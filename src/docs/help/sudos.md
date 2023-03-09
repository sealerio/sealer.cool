# Run sealer in non-root mode

## Install sealer using sudo

**Resolved remote read permission to `sshd_config` file:**

```bash
$ sudo chmod 644 /etc/ssh/sshd_config
```



### Ensure all nodes participating in the cluster have passwordless login permissions

**Still needs to assign non-secret permissions to user sudo(Every node except master0):**

You need to give passwordless login permissions to users on all nodes: `vim /etc/sudoers`. It is a configuration file that contains sudo user and group rules, allowing a specific user (sealer) or group to run commands as a superuser when executing commands.

```bash
sealer ALL=(ALL) NOPASSWD: NOPASSWD: ALL
```



## Rootless

**The rootless feature of [buildah](https://github.com/containers/buildah) is not addressed, which is still a problem.**