import mysql from 'mysql2';
import * as dotenv from "dotenv";
import readline from 'readline';
import { exit } from 'process';

dotenv.config();

console.log("Connecting to MySQL Engine");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "3306")
});

console.log("Connection Success!");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const waitForUserInput = () =>
  rl.question("Command: ", (answer) => {
    if (answer == "exit") {
      console.log("Goodbye");
      rl.close();
      exit();
    } else {
      waitForUserInput();
    }
  });

waitForUserInput();

export default connection;