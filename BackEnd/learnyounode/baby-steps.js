console.log(require("node:process").argv.slice(2).reduce((pre, curr)=>+pre + +curr,0));

