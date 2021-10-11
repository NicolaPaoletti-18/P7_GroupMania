const mysql = require('mysql');

//connection MySQL DATABASE 
exports.connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'IlmioaccountMySQL!!97',
  database: 'groupmania_db',
  charset: 'utf8mb4',
  timezone: 'local'
});

  
// module.exports = connection;
// FIN CONNECTION MySQL
