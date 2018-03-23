'use strict';
const path = require('path');
const fs = require('fs-extra');
const exec = require('child_process').exec;

const co = require('co');
const prompt = require('co-prompt');

const program = require('commander');
const chalk = require('chalk');
const download = require('download-git-repo');
const ora = require('ora');
const inquirer = require('inquirer');

const config = require('../templates');

module.exports = () => {
    co(function*() {
        let tplName = yield prompt('模板名称：');
        let projectName = yield prompt('新建的项目名称：');

        if (config.tpl[tplName]) {
            //　说明是扩展模板
            let gitUrl = config.tpl[tplName].url;
            let branch = config.tpl[tplName].branch || 'master';
            initExtTpl(gitUrl, branch, projectName);
        } else {
            // 说明是内置模板
            let destPath = path.resolve(projectName);
            let template = `omycli/${tplName}`;

            if (fs.existsSync(destPath)) {
                inquirer
                    .prompt([
                        {
                            type: 'confirm',
                            message: '已存在该项目名称的文件夹，是否覆盖？',
                            name: 'y' || 'Y'
                        }
                    ])
                    .then(function(answers) {
                        if (answers.ok){
                            initTpl(template, destPath, projectName)
                        }
                    });
            } else {
                initTpl(template, destPath, projectName);
            }
        }

        function initTpl(from, to, projectName) {
            const spinner = ora('Downloading template').start();
            const clone = program.clone || false;
            download(from, to, { clone }, function(err) {
                spinner.stop();
                if (err) {
                    console.log('');
                    console.log(
                        '  Failed to download repo ' +
                            chalk.red(from) +
                            ': ' +
                            err.message.trim()
                    );
                    console.log('');
                    process.exit();
                } else {
                    // copy default config file
                    console.log('');
                    console.log(
                        '  基于' + chalk.green(from) + ' 初始化项目成功！'
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

        function initExtTpl(gitUrl, branch, projectName) {
            let cmdStr = `git clone -b ${branch} ${gitUrl} ${projectName}`;
            const spinner = ora('\n 开始创建项目......').start();
            exec(cmdStr, (error, stdout, stderr) => {
                if (error) {
                    console.log(chalk.red(error));
                    process.exit();
                }
                spinner.stop();
                console.log(chalk.green('\n √ 项目创建成功！'));
                console.log(`\n 请 cd ${projectName} && npm install \n`);
                process.exit();
            });
        }
    });
};
