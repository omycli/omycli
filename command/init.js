'use strict';
const path = require('path');
const fs = require('fs-extra');
const exec = require('child_process').exec;

const co = require('co');
const prompt = require('co-prompt');

const program = require('commander')
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');
const inquirer = require('inquirer');

const config = require('../templates');

module.exports = () => {
    co(function*() {
        let tplName = yield prompt('模板名称：');
        let projectName = yield prompt('新建的项目名称：');
        // let gitUrl, branch;

        if (!config.tpl[tplName]) {
            tplName = 'base';
        }
        if (!projectName) {
            projectName = tplName;
        }
        let destPath = path.resolve(projectName);
        let template = `omycli/${tplName}`;

        if (fs.existsSync(destPath)) {
            inquirer
                .prompt([
                    {
                        type: 'confirm',
                        message: '已存在该项目名称的文件夹，是否覆盖？',
                        name: 'ok'
                    }
                ])
                .then(function(answers) {
                    if (answers.ok) init(template, destPath, projectName);
                });
        } else {
            init(template, destPath, projectName);
        }

        function init(from, to, projectName) {
            const spinner = ora('Downloading template').start();
            const clone = program.clone || false
            download(from, to, { clone }, function(err) {
                spinner.stop();
                if (err) {
                    console.log('');
                    console.log(
                        '  Failed to download repo ' +
                            chalk.red(template) +
                            ': ' +
                            err.message.trim()
                    );
                    console.log('');
                    process.exit();
                } else {
                    // copy default config file
                    console.log('');
                    console.log(
                        '  基于' +
                            chalk.green(template) +
                            ' 初始化项目成功！'
                    );
                    console.log('');
                    console.log('你可以按如下操作运行你的项目：');
                    console.log('');
                    if (program.args[0]) {
                        console.log(
                            chalk.cyan(
                                '  $ cd ' + projectName + ' && npm install'
                            )
                        );
                    } else {
                        console.log(chalk.cyan('  $ npm install'));
                    }
                    console.log(chalk.cyan('  $ omycli start'));
                    console.log('');
                    process.exit();
                }
            });
        }

        // gitUrl = config.tpl[tplName].url;
        // branch = config.tpl[tplName].branch;

        // let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`;
        // const spinner = ora('\n 开始创建项目......').start()

        // exec(cmdStr, (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(chalk.red(error));
        //         process.exit();
        //     }
        //     spinner.stop();
        //     console.log(chalk.green('\n √ 项目创建成功！'));
        //     console.log(`\n 请 cd ${projectName} && npm install \n`);
        //     process.exit();
        // });
    });
};
