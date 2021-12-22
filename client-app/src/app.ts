import express, { Application } from 'express';
import routes from './routes';
import mysql from 'mysql2';
import cors from 'cors';
import * as dotenv from "dotenv";

// Boot express
const app: Application = express();

app.use(express.json());
app.use(cors())

dotenv.config();

console.log("Connecting to MySQL Engine");
// create the connection to database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "3306")
});
db.connect();
console.log("Connection Success!");

// Application routing
routes(app);

export { db, app };
// export default ;

