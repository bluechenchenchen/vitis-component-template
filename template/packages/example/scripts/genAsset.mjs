import materialParser from 'vitis-material-parser';
import { resolve } from 'path';
import fs from 'fs-extra';

async function run() {
    const componentPath = resolve(process.cwd(), 'src','component.tsx')
    const asset = await materialParser.default(componentPath, {
        workDir: process.cwd()
    })

    const assetPath = resolve(process.cwd(), 'asset4', 'index.json')
    fs.ensureFileSync(assetPath)
    fs.writeFileSync(
        assetPath, 
        asset
    )
}

run()