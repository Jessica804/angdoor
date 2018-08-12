const yargs = require('yargs');
const Server = require('./app');
const chalk = require('chalk');
const argv = yargs
    .usage('anydoor [options]')
    .option('p',{
        alias:'port',
        describe:'端口号',
        default:9876 
    })
    .option('h',{
        alias:'hostname',
        describe:'host',
        default:'127.0.0.1'
    })
    .option('d',{
        alias:'root',
        describe:'root path',
        default:process.cwd()
    })
    .version()
    .alias('v','version')
    .help()
    .argv;

    const server = new Server(argv);
    console.log(chalk.red(argv));
    server.start();