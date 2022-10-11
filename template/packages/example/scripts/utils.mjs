import child_process from 'child_process'
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import prompts from 'prompts'

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

export async function npmLogin() {
    const {username, password, email} = await promptLogin()
    if (!username || !password || !email) {
        return Promise.reject(`npm login error: username、password or email is not provided`);
    }

    return new Promise((resolve, reject) => {
        const child = child_process.exec('npm login', {
            stdio: ['pipe', 'pipe', 'pipe']
        });
        child.stdout.on('data', d => {
            const data = d.toString();
            process.stdout.write(data + '\n');
            if (data.match(/username/i)) {
                child.stdin.write(username + '\n');
            } else if (data.match(/password/i)) {
                child.stdin.write(password + '\n');
            } else if (data.match(/email/i)) {
                child.stdin.write(email + '\n');
            } else if (data.match(/logged in as/i)) {
                child.stdin.end();
            }
        });
        child.stderr.on('data', d => {
            const data = d.toString();
            process.stderr.write(data + '\n');
            if (data.match(/npm err/i)) {
                child.kill();
            }
        });
        let completed = false;
        child.on('exit', (code) => {
            if (completed) return;
            completed = true;
            if (code === 0) {
                resolve();
            } else {
                reject('npm login error');
            }
        });
        child.on('error', () => {
            reject('npm login error');
        });
    });
}

async function promptLogin() {
    const questions = [
        {
            type: 'text',
            name: 'username',
            message: '请输入 npm 用户名',
        },
        {
            type: 'text',
            name: 'password',
            message: '请输入 npm 用户密码',
        },
        {
            type: 'text',
            name: 'email',
            message: '请输入 npm 用户邮箱',
        },
    ]
    return await prompts(questions)
}
