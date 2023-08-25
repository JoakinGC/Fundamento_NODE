import { readFileSync ,writeFileSync} from "fs";
import {createInterface} from "readline";
import chalk from 'chalk';

const taks = [],
DB_FILE = "tasks.txt";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});


function displayMenu(){
    console.log(chalk.yellow.bold("********* To Do App ***********"));
    console.log(chalk.blueBright("MENU DE OPCINES:"));
    console.log("1. Agregar Tarea");
    console.log("2. Listar tareas");
    console.log("3. Completar Tarea");
    console.log("4. Salir");
    console.log("\n");
    useOption();
}

function saveTask(){
    const data = taks.map(task => `${task.task}|${task.completed}`).join("\n");
    writeFileSync(DB_FILE,data,"utf-8");

    console.log(chalk.green.bold("Tarea agregada exitosamente en la DB\n\n"));
}

function loadTasks(){
    try {
        const data = readFileSync(DB_FILE, "utf-8");
        const line = data.split("\n");
        taks.length = 0;

        line.forEach(line => {
            if(line.trim() !== "") {
                const [task, completed] = line.split("|");
                taks.push({task,completed:completed === true});
            }
            
        });

        console.log(chalk.green.bold("Las tareas se han cargado desde la BD\n"));
    } catch (error) {
        console.log(chalk.green.bold("No hay tareas pendientes\n"))
    
    }
}


function completeTask(){
    console.log();

    rl.question(chalk.bgMagentaBright("Digita el número de la tarea a completar: "),(taskNumber) =>{
        const index = parseInt(taskNumber) - 1;        

        if(index >= 0 && index < taks.length){
            taks[index].completed = true;
            saveTask();
            console.log(chalk.green.bold("Tarea marcada con exito. \n\n"));
        }else{
            console.log(chalk.red.bold("Número de tarea inválido. \n\n"));
        }
        displayMenu();
        useOption();
    });
}

function listTask(){
    console.log(chalk.yellow.bold("\n********* Tareas *********\n"));

    if(taks.length === 0){
        console.log(chalk.bgGreen("NO hay tareas por hacer\n\n"));
    }else{
        taks.forEach((task,index) =>{
            let status = task.completed ? "✅" : "❌";

            if(task.completed){
                console.log(chalk.greenBright(`${index + 1}. ${status} - ${task.task}`))
            }else{
                console.log(chalk.redBright(`${index + 1}. ${status} - ${task.task}`))
            }            
        });
    }
    
    displayMenu();
    useOption();
}

function addTask(){
    rl.question(chalk.bgMagenta("Escribe la tarea: "),(task) =>{
        taks.push({task,completed:false});
        console.log(chalk.green.bold("Tarea completada con exito\n\n"));
        saveTask();
        displayMenu();
        useOption();
        //console.log(taks);
    });
}

function useOption(){
    rl.question("Elige una opción, digita el número de tu opción:", (choice) => {
        switch (choice){
            case "1":
                addTask();
                break;
            case "2":
                listTask();
                break;
            case "3":
                completeTask();
                break;
            case "4":
                console.log(chalk.yellow("ADIOS"));
                rl.close();
                break;
            default:
                console.log(chalk.red("Opcion no valida\n\n"));
                //console.log(choice)
                displayMenu();
                useOption();
                break;
        }
    });
}

loadTasks();
displayMenu();
useOption();