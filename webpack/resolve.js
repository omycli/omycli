const fs = require('fs');
const path = require('path');

// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());//返回当前工作目录的绝对路径

function resolveApp(relativePath) {
    // 将一系列路径或路径段解析为绝对路径
    return path.resolve(appDirectory, relativePath);
}

function resolveOwn(relativePath) {
    // 将一系列路径或路径段解析为绝对路径
    return path.resolve(__dirname, '..', relativePath);
}

/**
 * check file/dir whether exist
 *
 * @param {string} path check path
 * @param {string} type [file, dir]
 *
 * @return boolean
 */
function isExist(path, type) {
    let ok = false;
    try {
        const stat = fs.statSync(path);
        if (type === 'file' && stat.isFile()) ok = true;
        if (type === 'dir' && stat.isDirectory()) ok = true;
    } catch (e) {
        ok = false;
    }
    return ok;
}

exports.resolveApp = resolveApp();
exports.resolveOwn = resolveOwn();
exports.isExist = isExist();
