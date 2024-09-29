module.exports= mymodule=(dir, ext, callback)=>
    require("fs").readdir(dir,"utf8", (err, files)=>
        err ? callback(err) : callback(null, files.filter(file=>require("path").extname(file)===`.${ext}`))
);
