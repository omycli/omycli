process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const host = require('ip').address();
const qrcode = require('qrcode-terminal');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const openBrowser = require('react-dev-utils/openBrowser');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const allConfig = require('./../webpack/config/index');
const webpackConfig = require('./../webpack/webpack.config.dev');

const isInteractive = process.stdout.isTTY; //判断是否为交互j终端打开

let isFirstRun = true;

function setupCompiler(port) {
    compiler = webpack(webpackConfig);

    compiler.plugin('invalid', function() {
        console.log('');
        console.log(chalk.cyan('  Compiling...'));
        console.log('');
    });

    compiler.plugin('done', function(stats) {
        process.stdout.write(
            stats.toString({
                colors: true,
                reasons: true,
                errorDetails: true,

                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n'
        );

        if (stats.hasErrors()) {
            console.log('');
            console.log(chalk.cyan('  Compiling fail!'));
            console.log('');
            return;
        }
        if (isFirstRun) {
            console.log('');
            console.log(chalk.cyan('  Compile finished'));
            console.log('');
            console.log(chalk.cyan('  Webpack dev server running at: '));
            console.log('');
            console.log(chalk.cyan('  http://' + host + ':' + port + '/'));
            console.log('');
            if (allConfig.DEVELOPMENT.enableDisplayQR) {
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
        }

        isFirstRun = false;
    });
}

function runDevServer(port) {
    const devServer = new WebpackDevServer(compiler, webpackConfig.devServer);
    devServer.listen(port, (err, result) => {
        if (err) {
            return console.log(err);
        }

        console.log(chalk.cyan('启动开发服务......'));
        console.log();

        if (isInteractive) {
            // openBrowser('http://' + host + ':' + port + '/');
            console.log(chalk.green('http://' + host + ':' + port + '/'));
        }
    });
}

function run(port) {
    setupCompiler(port);
    runDevServer(port);
}

clearConsole();
run(webpackConfig.devServer.port);
