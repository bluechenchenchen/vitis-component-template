import child_process from 'child_process'
import fs from 'fs'
import path from 'path'
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:3001',
    headers: {
        "Content-Type": 'application/json'
    }
})

export function execSync(cmd, catchOutput = false) {
    if (catchOutput) {
        return child_process.execSync(cmd).toString().trim();
    } else {
        child_process.execSync(cmd, { stdio: 'inherit' });
    }
}

export function hasPublished(packageName, version) {
    try {
        return !!execSync(`npm show ${packageName}@${version}`, true);
    } catch (e) {
        return false;
    }
}

export function getPackageInfo(packageDir) {
    // check package directory
    const pkgJsonFile = path.resolve(packageDir, 'package.json');
    try {
        fs.accessSync(pkgJsonFile);
    } catch (e) {
        throw `Publich package failed:  cannot find package.json under: ${packageDir}`;
    }

    return {
        packageJsonFile: pkgJsonFile,
        packageJson: JSON.parse(fs.readFileSync( pkgJsonFile, {encoding: 'utf-8'} ))
    };
}

export async function uploadComponent(data) {
    const result = await instance.request({
        method: 'POST',
        url: '/marketComponent/upload',
        data
    })
    return result.data
}
