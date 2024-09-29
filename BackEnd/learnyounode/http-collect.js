require("http").get(process.argv[2], (res)=>{
    let fullString ="";
    res.on("data", (chunk)=>fullString+=chunk.toString("utf8"));
    res.on("end", ()=>{
        console.log(fullString.length);
        console.log(fullString);
    })
});