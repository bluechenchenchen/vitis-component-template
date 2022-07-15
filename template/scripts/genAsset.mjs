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
              version: version || '0.0.0',
              props: asset ? asset.props: '',
              component: {
                // 该组件是否是容器
                isContainer: false,
                // 该组件的嵌套规则
                nestingRule: {
                    // 父级组建
                    parentWhitelist: ['LayoutColumn'],
                    // 子组建
                    childWhitelist: []
                }
              },
              supports: {
                // 是否支持样式设置
                styles: true,
                // 是否支持校验规则
                validation: false,
                // 是否支持联动
                linkage: false,
              },
            },
            null,
            2,
        ),
    )
}

run()