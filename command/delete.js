'use strict';
const co = require('co');
const prompt = require('co-prompt');

const config = require('../templates.json');
const chalk = require('chalk');
const fs = require('fs');

module.exports = () => {
    co(function*() {
        let tplName = yield prompt('模板名称：');

        if (config.tpl[tplName]) {
            config.tpl[tplName] = undefined;
        } else {
            console.log(chalk.red('该模板不存在！'));
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
                console.log(chalk.green('模板删除成功！'));
                console.log(chalk.grey('最新的模板列表：\n'));
                console.log(chalk.yellow(JSON.stringify(config)));
                console.log('\n');
                process.exit();
            }
        );
    });
};
