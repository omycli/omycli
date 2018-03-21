const fs = require('fs');
const path = require('path');

// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
exports.resolveApp = function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
};
exports.resolveOwn = function resolveOwn(relativePath) {
    return path.resolve(__dirname, '..', relativePath);
};

/**
 * check file/dir whether exist
 *
 * @param {string} path check path
 * @param {string} type [file, dir]
 *
 * @return boolean
 */
exports.isExist = function(path, type) {
    let ok = false;
    try {
        const stat = fs.statSync(path);
        if (type === 'file' && stat.isFile()) ok = true;
        if (type === 'dir' && stat.isDirectory()) ok = true;
    } catch (e) {
        ok = false;
    }
    return ok;
};
