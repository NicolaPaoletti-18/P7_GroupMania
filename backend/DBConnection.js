
const mysql = require('mysql');
const environment = require("./environment");// Récupère les variables d'environnement



//connection MySQL DATABASE 
exports.connection = mysql.createPool({
  host: 'localhost',
  user:  `${environment.DB_USERNAME}`,
  password: `${environment.DB_PASSWORD}`,
  database: `${environment.DB_DATABASE}`,
  charset: 'utf8mb4',
  timezone: 'local'
});

  

// FIN CONNECTION MySQL
