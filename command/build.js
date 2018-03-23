const spawn = require('cross-spawn');
const path = require('path');
const program = require('commander');
const chalk = require('chalk');

module.exports = async () => {
    const ARCHIVE_TYPE = ['zip', 'tar'];

    if (program.archive && typeof program.archive === 'string') {
        let archiveType = path.extname(program.archive).slice(1);
        if (!~ARCHIVE_TYPE.indexOf(archiveType)) {
            console.log('');
            console.log(
                chalk.red('  archive filename suffix only support: ') +
                    chalk.bgRed(ARCHIVE_TYPE)
            );
            console.log('');
            process.exit(1);
        }
    }

    const result = spawn.sync(
        'node',
        [
            require.resolve('../src/build.js'),
            program.debug ? program.debug : '',
            program.archive ? program.archive : ''
        ].concat(program.args),
        {
            stdio: 'inherit'
        }
    );
    process.exit(result.status);
};
