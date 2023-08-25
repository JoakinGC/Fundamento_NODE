const fs = require("fs");

console.log("Inicio del programa");

fs.readFile("archvio.txt","utf-8",(err,data) =>{
    if(err) throw err;
    console.log(data);
});


console.log("Fin");