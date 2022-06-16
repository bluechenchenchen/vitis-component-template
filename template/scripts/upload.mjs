import chalk from 'chalk';
import spawn from 'cross-spawn-promise'

const { green, red } = chalk;

async function build() {
    try {
        /**组件打包 */
        console.log(`${green('开始打包组件')}`);
        await spawn("father-build")
        console.log(`${green('组件打包完成...，开始打包文档')}`);
        /**文档打包 */
        await spawn("dumi",['build'])
        console.log(`${green('文档打包完成')}`);
    } catch (error) {
        console.error(red(error))
    }
    
}

function run() {
    build()
}

run()