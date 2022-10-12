import chalk from 'chalk';
import fs from 'fs'
import path from 'path'
import { execSync, hasPublished, getPackageInfo } from './utils.mjs'

const { red } = chalk;

async function build() {
    try {
        const isExistAsset =  fs.existsSync( path.resolve(process.cwd(), 'asset', 'index.json') )
        if (!isExistAsset) {
            throw '不存在组件描述协议，执行 yarn genAsset 生成组件描述文件，详情可查看 README.md'
        }

        const packageInfo = getPackageInfo(process.cwd())
        const { name, version, componentConfig } = packageInfo.packageJson
        if (hasPublished(name, version)) {
            throw `${name}@${version}已发布`
        }

        if (!componentConfig) {
            throw `${packageInfo.packageJsonFile} 不存在 componentConfig 字段`
        }

        if (!componentConfig.name || !componentConfig.title || !componentConfig.iconUrl) {
            throw `请为${packageInfo.packageJsonFile}的 componentConfig 字段补齐 name、title 和 iconUrl 属性`
        }

        /**单元测试 */
        execSync("umi-test")
        /**组件打包 */
        execSync("father-build")
        /**文档打包 */
        execSync ("dumi build")
    } catch (error) {
        console.error(red(error))
        process.exit()
    }
}

build()