require("./mymodule")(process.argv[2], process.argv[3], (err, data)=>
    err ? console.log(err) : data.forEach((file)=>console.log(file))
);