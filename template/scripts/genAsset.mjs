import materialParser from 'vitis-material-parser';
import { resolve } from 'path';
import fs from 'fs-extra';

async function run() {
    const componentPath = resolve(process.cwd(), 'src','component.tsx')
    const asset = await materialParser.default(componentPath, {
        workDir: process.cwd()
    })
    const { componentConfig, version, description } = JSON.parse(fs.readFileSync( resolve(process.cwd(), 'package.json'), {encoding: 'utf-8'} ))

    const assetPath = resolve(process.cwd(), 'asset', 'index.json')
    fs.ensureFileSync(assetPath)

    fs.writeFileSync(
        assetPath, 
        JSON.stringify(
            {
              componentName: componentConfig.name,
              title: componentConfig.title,
              iconUrl: componentConfig.iconUrl || '',
              description,
              docUrl:'todo',
              version: version || '0.0.0',
              props: asset ? asset.props: '',
              advanced: {
                // 组件的嵌套规则
                nestingRule: {
                  // 父级组件白名单
                  // 业务组件必须放置在布局组件中
                  parentWhitelist: ['LayoutColumn'],
                  // 子组件白名单。
                  // 空数组则说明其他组件不能放置在该组件中
                  childWhitelist: []
                },
                supports: {
                  // 是否能配置样式
                  styles: true,
                  // 是否能配置校验规则
                  validation: false,
                  // 是否能配置联动规则
                  linkage: false,
                },
                // 该组件是否是容器，比如 table 就是一个容器，它能单独从接口中获取自己的数据源
                isContainer: false,
                // 是否是表单组件
                isFormControl: false,
                // 是否是布局组件
                isLayout: false
              },
            },
            null,
            2,
        ),
    )
}

run()