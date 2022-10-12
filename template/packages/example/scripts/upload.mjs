import chalk from 'chalk';
import { getPackageInfo, uploadComponent } from './utils.mjs'

const { red, green } = chalk;

async function upload() {
    try {
        const packageInfo = getPackageInfo(process.cwd())
        const { name, version, description, componentConfig } = packageInfo.packageJson

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

upload()