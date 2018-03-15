process.env.NODE_ENV = 'development';

const chalk = require('chalk');
const ip = require('ip');

const clearConsole = require('react-dev-utils/clearConsole');
const qrcode = require('qrcode-terminal');

const fis = module.exports = require('fis3');



function run(port) {
    const host = ip.address();
    qrcode.generate(
        'http://' + host + ':' + port + '/',
        {
            small: true
        },
        function(qrcode) {
            console.log(qrcode);
        }
    );
    console.log(chalk.red(host));
}

clearConsole();
run(8000);
