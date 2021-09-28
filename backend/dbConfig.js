const mysql = require('mysql');


exports.connection = mysql.createPool({
  host: 'localhost',
  user: 'GroupDB',
  password: 'IlmioaccountMySQL!!97',
  database: 'db_groupmania',
  charset: 'utf8mb4'
});