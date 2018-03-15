const spawn = require('cross-spawn');
const program = require('commander');

module.exports = async () => {
    const result = spawn.sync(
        'node',
        [require.resolve('../src/start')].concat(program.args),
        {
            stdio: 'inherit'
        }
    );
    process.exit(result.status);
};
