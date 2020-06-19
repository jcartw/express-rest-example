const mysql = require("promise-mysql");

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DB_NAME || "RestExample",
  connectionLimit: 10,
});

module.exports = pool;
