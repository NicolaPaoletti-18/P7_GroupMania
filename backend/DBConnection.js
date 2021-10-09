const mysql = require('mysql');

//connection MySQL DATABASE 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'IlmioaccountMySQL!!97',
  database: 'groupmania_db',
  charset: 'utf8mb4',
  timezone: 'local'
});
connection.connect(function(err){
  if (err) {throw err}
  else{
    console.log("MySQL Connected ...");
  }
  
});

module.exports = connection;
// FIN CONNECTION MySQL
