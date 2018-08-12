const {createGzip,creatDeflate} = require('zlib')
module.exports = (rs,req,res) => {
   const acceptEncoding = req.headers['accept-encoding'];
   if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|defalte)\b/)) {
       return  rs;
   }else if(acceptEncoding.match(/\bgzip\b/)){
       res.setHeader('Content-Encoding','gzip')
       return rs.pipe(createGzip())
   }else if(acceptEncoding.match(/\defalte\b/)){
       res.setHeader('Content-Encoding','gzip')
       return rs.pipe(creatDeflate())
   }
}