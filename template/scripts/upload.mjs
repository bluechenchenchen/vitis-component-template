import chalk from 'chalk';
import spawn from 'cross-spawn-promise'
import fs from 'fs'
import path from 'path'

const { green, red } = chalk;

async function build() {
    try {
        const isExistAsset =  fs.existsSync( path.resolve(process.cwd(), 'asset', 'index.json') )
        if (!isExistAsset) {
            throw '不存在组件描述协议，执行 yarn genAsset 生成组件描述文件，详情可查看 README.md'
        }
        /**单元测试 */
        await spawn("umi-test")
        console.log(`${green('单元测试通过')}`);
        /**组件打包 */
        console.log(`${green('开始打包组件')}`);
        await spawn("father-build")
        console.log(`${green('组件打包完成...，开始打包文档')}`);
        /**文档打包 */
        await spawn("dumi",['build'])
        console.log(`${green('文档打包完成，即将发布到 npm 共有库，确保已登录 npm 账号')}`);

    } catch (error) {
        console.error(red(error))
    }
    
}

function run() {
    build()
}

run()