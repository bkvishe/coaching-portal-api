import "reflect-metadata";
import {createConnection} from "typeorm";

createConnection().then(async connection => {

    console.log("Running....");


}).catch(error => console.log(error));
