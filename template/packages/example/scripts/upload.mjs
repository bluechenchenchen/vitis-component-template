import chalk from 'chalk';
import fs from 'fs'
import path from 'path'
import { execSync, hasPublished, getPackageInfo, uploadComponent } from './utils.mjs'

const { red, green } = chalk;

async function build() {
    try {
        const isExistAsset =  fs.existsSync( path.resolve(process.cwd(), 'asset', 'index.json') )
        if (!isExistAsset) {
            throw '不存在组件描述协议，执行 yarn genAsset 生成组件描述文件，详情可查看 README.md'
        }
        const user = execSync('npm who am i', true)
        if (!user) {
            throw '请先登录 npm 账号，在 cli 中执行 npm login 命令'
        }
        const packageInfo = getPackageInfo(process.cwd())
        const { name, version, description, componentConfig } = packageInfo.packageJson
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
        /**发布到 npm */
        execSync("npm publish")
        const resData = await uploadComponent({
            packageName: name,
            version,
            description,
            componentName: componentConfig.name,
            title: componentConfig.title,
            iconUrl: componentConfig.iconUrl || '/',
        })
        if (resData.code !== '0') {
            throw resData.msg || '未知错误'
        } else {
            console.log(green('组件上传成功!!!'))
        }
    } catch (error) {
        console.error(red(error))
    }
    
}

function run() {
    build()
}

run()