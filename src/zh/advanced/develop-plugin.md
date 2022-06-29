# 开发tree plugin.

## 体系结构

Sealer支持常用插件，如hostname插件，label插件，内置，用户可以根据自己的需求定义和使用。
Sealer还支持加载由golang编写的树插件。
本页介绍如何扩展新的插件类型以及如何开发树外插件。

## 用例

### 如何开发tree plugin

如果用户不希望他们的插件代码开源，我们可以开发一个tree plugin来使用它。

1. 实现golang插件接口并暴露名为的变量 `Plugin`.

* 包名必须是"main"
* 暴露的变量必须是"Plugin"
* 暴露的变量必须是"PluginType"

例如:list_nodes.go

```shell
package main

import (
	"fmt"
	"github.com/sealerio/sealer/client/k8s"
	"github.com/sealerio/sealer/plugin"
)

type list string

func (l *list) Run(context plugin.Context, phase plugin.Phase) error {
	client, err := k8s.Newk8sClient()
	if err != nil {
		return err
	}
	nodeList, err := client.ListNodes()
	if err != nil {
		return fmt.Errorf("cluster nodes not found, %v", err)
	}
	for _, v := range nodeList.Items {
		fmt.Println(v.Name)
	}
	return nil
}

var PluginType = "LIST_NODE"
var Plugin list
```

2. 将新插件构建为so文件。插件文件和sealer源代码必须在同一个golang运行时，以避免编译问题。我们建议so文件必须使用您使用的特定密封器版本构建。
   否则，sealer将无法加载so文件。您可以替换测试目录中的构建文件
   在下面 [Example](https://github.com/sealerio/sealer/blob/main/pkg/plugin) 建立自己的so文件。

```shell
go build -buildmode=plugin -o list_nodes.so list_nodes.go
```

3. 使用新的so文件

将so文件和插件配置文件复制到您的集群镜像中。我们也可以将插件yaml附加到Clusterfile并使用`sealer apply -f Clusterfile`来测试它。

Kubefile:

```shell
FROM kubernetes:v1.19.8
COPY list_nodes.so plugins
COPY list_nodes.yaml plugins
```

```shell script
sealer build -m lite -t kubernetes-post-install:v1.19.8 .
```

list_nodes.yaml:

```yaml
apiVersion: sealer.aliyun.com/v1alpha1
kind: Plugin
metadata:
  name: list_nodes.so # out of tree plugin name
spec:
  type: LIST_NODE # define your own plugin type.
  action: PostInstall # which stage will this plugin be applied.
```

将其应用到您的集群中: `sealer run kubernetes-post-install:v1.19.8 -m x.x.x.x -p xxx`