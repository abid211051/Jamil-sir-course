require("http").get(process.argv[2], (respose)=>
    respose.on("data", (chunk)=>console.log(chunk.toString("utf8")))
)