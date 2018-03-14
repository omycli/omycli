'use strict';
const chalk = require('chalk');
const fs = require('fs');
const co = require('co');
const prompt = require('co-prompt');

const config = require('../templates.json');

module.exports = async () => {
    co(function*() {
        let tplName = yield prompt('模板名称：');
        let tplDes = yield prompt('模板简介：');
        let gitUrl = yield prompt('ｇｉｔ https 链接：');
        let branch = yield prompt('分支：');

        if (!config.tpl[tplName]) {
            config.tpl[tplName] = {};
            config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '');
            config.tpl[tplName]['branch'] = branch;
            config.tpl[tplName]['description'] = tplDes;
        } else {
            console.log(chalk.red('该模板已经存在了'));
            process.exit();
        }

        fs.writeFile(
            __dirname + '/../templates.json',
            JSON.stringify(config),
            'utf-8',
            err => {
                if (err) {
                    console.log(chalk.red(err));
                }
                console.log(chalk.green('新模板创建成功！\n'));
                console.log(chalk.grey('最新的扩展库模板列表：\n'));
                console.log(chalk.yellow(JSON.stringify(config.tpl)));
                console.log('\n');
                process.exit();
            }
        );
    });
};
