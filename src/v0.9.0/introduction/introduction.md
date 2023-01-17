# What is Sealer?

## Introduction

Sealer[ˈsiːlər] provides a new way of distributed application delivery which is reducing the difficulty and complexity by packaging Kubernetes cluster and all application's dependencies into one `Sealer Image`.

We can write a `Kubefile`, and build a `Sealer Image`, then using a `Clusterfile` to run a `Sealer Image`.

![](https://user-images.githubusercontent.com/8912557/117400612-97cf3a00-af35-11eb-90b9-f5dc8e8117b5.png)

>[Kubefile](../concept/kubefile.md): a file that describes how to build a Sealer Image.
>
>[Sealer Image](../concept/sealer-image.md): like docker image, and it contains all the dependencies you need to deploy a cluster or applications(like container images, yaml files or helm chart).
>
>[Clusterfile](../concept/clusterfile.md): a file that describes how to run a Sealer Image.

## Awesome features

+ Simplicity: Packing the distributed application into ClusterImage with few instructions.
+ Efficiency: Launching the k8s-based application through ClusterImage in minutes.
+ Scalability: Powerful cluster and image life cycle management, such as cluster scale, upgrade, image load, save and so on.
+ Compatibility: Multi-arch delivery Supporting. Such as AMD, ARM with common Linux distributions.
+ Iterative: Incremental operations on ClusterImage is like what container image behaves.

