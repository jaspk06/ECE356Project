import mysql from 'mysql2';
import * as dotenv from "dotenv";

dotenv.config();

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "3306")
});


// // simple query
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// // with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function (err, results) {
//     console.log(results);
//   }
// );