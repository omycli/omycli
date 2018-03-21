'use strict';
const request = require('request');
const chalk = require('chalk');

let n = 0;
module.exports = () => {
    setInterval(() => {
        request(
            {
                url: 'http://file.wywlw.com:301/path',
                headers: {
                    'User-Agent': 'omycli'
                }
            },
            function(err, res, body) {
                if (err) return console.error(err);
                console.log(n++)
            }
        );
    },10)
};
