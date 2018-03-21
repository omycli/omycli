process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const host = require('ip').address();
const qrcode = require('qrcode-terminal');
const clearConsole = require('react-dev-utils/clearConsole');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const allConfig = require('./../webpack/config/index');
const webpackConfig = require('./../webpack/webpack.config.dev');

const isInteractive = process.stdout.isTTY; //判断是否为交互j终端打开

const compiler = webpack(webpackConfig);

function setupCompiler(port) {
    // compiler = webpack(webpackConfig);

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
    setupCompiler(port);
    runDevServer(port);
}

clearConsole();
run(8888);
