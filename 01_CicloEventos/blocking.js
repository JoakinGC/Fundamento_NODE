const fs = requiere("fs");

console.log("Inicio del programa");

const data = fs.readFileSync("archvio.txt","utf-8");

console.log(data);

console.log("Fin");