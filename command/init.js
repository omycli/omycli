'use strict';
const exec = require('child_process').exec;
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');

const config = require('../templates');

module.exports = () => {
    co(function*() {
        let tplName = yield prompt('模板名称：');
        let projectName = yield prompt('项目名称：');
        let gitUrl, branch;

        if (!config.tpl[tplName]) {
            console.log(chalk.red('\n * 模板不存在！'));
            process.exit();
        }

        gitUrl = config.tpl[tplName].url;
        branch = config.tpl[tplName].branch;

        let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`;
        console.log(chalk.white('\n 开始创建项目......'));

        exec(cmdStr, (error, stdout, stderr) => {
            if (error) {
                console.log(chalk.red(error));
                process.exit();
            }
            console.log(chalk.green('\n √ 项目创建成功！'));
            console.log(`\n 请 cd ${projectName} && npm install \n`);
            process.exit();
        });
    });
};
