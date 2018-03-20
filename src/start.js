process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const host = require('ip').address();
const qrcode = require('qrcode-terminal');
const clearConsole = require('react-dev-utils/clearConsole');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const isInteractive = process.stdout.isTTY; //判断是否为交互j终端打开

const complier

function setupCompiler(port) {
    
    complier = webpack();
}

function runDevServer(port) {
    const devServer = new WebpackDevServer(complier);
    devServer.listen(port, (err, result) => {
        if (err) {
            return console.log(err);
        }

        console.log(chalk.cyan('启动开发服务......'));
        console.log();

        if (isInteractive) {
            console.log(chalk.green('http://' + host + ':' + port + '/'));
            qrcode.generate(
                'http://' + host + ':' + port + '/',
                {
                    small: true
                },
                function(qrcode) {
                    console.log(qrcode);
                }
            );
        }
    });
}

function run(port) {
    runDevServer(port);
}

clearConsole();
run(8888);
