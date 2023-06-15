# Installing Sealer

## System requirements

Recommended OS:

|             Arch               |                                             OS                                              |                              Kernel                       |
| :----------------------------: | :-----------------------------------------------------------------------------------------: | :-------------------------------------------------------: |
|           x86/arm64            | CentOS/RHEL 7.5<br>CentOS/RHEL 7.6<br>CentOS/RHEL 7.7<br>CentOS/RHEL 7.8<br>CentOS/RHEL 7.9 | 4.18.* （recommend） <br>  4.19.*  <br> 3.10.*(>=3.10.0-1160)   |

## From the Binary Releases

Every release of sealer provides binary releases for a variety of OSes. These binary versions can be manually downloaded
and installed.

1. Download sealer binary

```shell
wget https://github.com/sealerio/sealer/releases/download/v0.10.0/sealer-v0.10.0-linux-amd64.tar.gz
```

2. Unpack it

```shell
tar zxvf sealer-v0.10.0-linux-amd64.tar.gz
```

3. Find the sealer binary in the unpacked directory, and move it to its desired destination

```shell
mv sealer /usr/bin
```

## From the Source code

1. Download sealer code

```shell
git clone https://github.com/sealerio/sealer.git
```

2. Enter the Sealer project

```shell
cd sealer
```

3. Switch to the main branch

```shell
git checkout main
```

4. Build the sealer binary

```shell
make linux
```

5. The built Sealer binaries are placed in the `_output/bin/sealer/linux_amd64/sealer` directory,you can upload it to
   your own machine for use