const fs = require('fs');
var path = require('path')
const Handlebars = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString());
const chalk = require('chalk');
const mimeType = require('./mimeType.js');
const compress = require('./compress')
const isFresh = require('./cacahe');

module.exports = async function (req, res, filePath, config) {
    try {
        const stats = await stat(filePath);
        //如果请求路径对应是文件还是文件夹
        if (stats.isFile()) {

            if (isFresh(stats, req, res)) {
                res.statusCode = 304;
                res.end();
                return;
            }

            const contentType = mimeType(filePath);
            res.setHeader('Content-Type', contentType);

            res.statusCode = 200;
            let rs  =  fs.createReadStream(filePath);
            if(filePath.match(config.compress)){
               rs = compress(rs,req,res)
            }

           rs.pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);

            res.statusCode = 200;
            const contentType = mimeType(filePath);
            res.setHeader('Content-Type', contentType);
            const dir = path.relative(config.root, filePath);
            const data = {
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : '',
                files
            }
            res.end(template(data))

        }
    } catch (ex) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filePath} is not a directory or file`);
        return;
    }
}