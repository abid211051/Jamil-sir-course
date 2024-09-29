require("http").get(process.argv[2], (res)=>{
    let fullString ="";
    res.on("data", (chunk)=>fullString+=chunk.toString("utf8"));
    res.on("end", ()=>{
        console.log(fullString);
        require("http").get(process.argv[3], (res)=>{
            let fullString ="";
            res.on("data", (chunk)=>fullString+=chunk.toString("utf8"));
            res.on("end", ()=>{
                console.log(fullString);
                require("http").get(process.argv[4], (res)=>{
                    let fullString ="";
                    res.on("data", (chunk)=>fullString+=chunk.toString("utf8"));
                    res.on("end", ()=>
                        console.log(fullString)
                    );
                });
        });
        });
    });
});