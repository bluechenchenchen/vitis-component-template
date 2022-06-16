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
              icon: componentConfig.icon || '',
              description,
              version: version || '0.0.0',
              props: asset ? asset.props: ''
            },
            null,
            2,
        ),
    )
}

run()