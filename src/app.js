const http = require("http");
const chalk = require("chalk");
const path = require('path');
const route = require('./helper/route')
const conf = require('./config/config')

class Server {
    constructor(config) {
        console.log("配置文件的port"+conf.port);
        console.log(" 自定义port "+config.port)
        this.config = Object.assign({},conf,config)
    }


    start() {
            const server = http.createServer((req, res) => {
            const filePath = path.join(this.config.root, req.url);
            route(req, res, filePath, this.config);
            
        });

        server.listen(this.config.port, this.config.hostname, () => {
            const addr = `http://${this.config.hostname}:${this.config.port}`;
            console.log(`Server started at ${chalk.green(addr)}`);
        });


    }
}

module.exports = Server;

