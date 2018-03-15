'use strict';
const request = require('request');
const ora = require('ora');
const chalk = require('chalk');

const config = require('../templates');

module.exports = () => {
    const spinner = ora('Loading template list').start();
    request(
        {
            url: 'https://api.github.com/users/omycli/repos',
            headers: {
                'User-Agent': 'omycli'
            }
        },
        function(err, res, body) {
            spinner.stop();
            if (err) return console.error(err);

            const requestBody = JSON.parse(body);
            if (Array.isArray(requestBody)) {
                console.log();
                console.log('最新的内置模板列表:');
                console.log();
                
                requestBody.forEach(repo =>
                    console.log(chalk.yellow(
                        '      - ' + repo.name + '  ' + repo.description
                    ))
                );
                console.log();
                console.log();
                console.log('最新的扩展库模板列表：\n');
                console.log(chalk.yellow(JSON.stringify(config.tpl, null, 4)));
                console.log();
                console.log();
                console.log('基于模板创建项目:');
                console.log();
                // console.log('      omycli init ' + requestBody[0].name);
                console.log(chalk.cyan('      omycli init '));
                console.log();
            } else {
                console.error(requestBody.message);
            }
        }
    );
    // process.exit();
};
