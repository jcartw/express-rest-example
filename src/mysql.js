const mysql = require("promise-mysql");

function _getMysqlConnection() {
  return mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "password",
    database: process.env.MYSQL_DB_NAME || "RestExample",
    connectionLimit: 10,
  });
}

function MySqlDb() {
  this.connection = { query: () => {} };
  this.init();
}

MySqlDb.prototype.init = async function () {
  this.connection = await _getMysqlConnection();
  console.log("Connected to MySQL Server");
};

MySqlDb.prototype.query = function (...args) {
  return this.connection.query(...args);
};

const db = new MySqlDb();

module.exports = db;
