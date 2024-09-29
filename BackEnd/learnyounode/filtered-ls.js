require("fs").readdir(process.argv[2], "utf8", (err, files)=>
    files.forEach((file)=>
        require("path").extname(file)===`.${process.argv[3]}`&&console.log(file)
));
