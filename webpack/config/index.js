import { resolve } from 'path';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const _ = require('lodash');

const { isExist, resolveApp, resolveOwn } = require('./../resolve');
const defaultConfig = require('./default');
const { CONFIG_FILENAME } = require('./const');

let config = {};

const configPath = resolveApp(CONFIG_FILENAME);
try {
    if (isExist(configPath, 'file')) {
        config = require(configPath);
    }
} catch (err) {
    console.log('');
    console.log(
        '加载配置文件: ' + chalk.cyan(configPath) + ' 出现错误!'
    );
    console.log('');
    console.error(err);
    process.exit(1);
}

module.exports = _.merge(defaultConfig, config);
