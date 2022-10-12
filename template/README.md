## 添加新的组件

```dotnetcli
vitis-cli add
```

## 开发属性设置器

```dotnetcli
vitis-cli setter
```

## 预览组件

这里的预览组件指的是将该 Monorepo 项目中的组件集成到低代码引擎中，预览组件在低代码引擎中的运行情况，这一步通常在组件开发完成之后进行，要预览组件必须先为组件生成组件规格，关于如何生成组件规格请查看组件的 README.md 文件。

```dotnetcli
yarn preview
```