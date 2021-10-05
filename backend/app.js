// MODULES
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const mysql = require('mysql');
const app = express();
const path = require('path');
const helmet = require("helmet");
const expressSanitizer = require('express-sanitizer');
// FIN MODULES

// IMPORTATION ROUTES
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
// FIN IMPORTATIONS

// PARAMETRAGE DES HEADERS
app.use((req, res, next) => { // Evite les erreurs CORS
  // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
      res.setHeader('Access-Control-Allow-Origin', '*');
  // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // on indique les méthodes autorisées pour les requêtes HTTP
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
  });

// HELMET
app.use(helmet()); // Protège l'app en paramétrant des Headers (notamment contre les failles XSS)
// FIN HELMET

app.use(cors());

// connection MySQL DATABASE 
const db =mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'IlmioaccountMySQL!!97',
  database: 'groupmania_db',
});
db.connect((err) => {
  if(err) {
    throw err;
  }else{
  console.log("MySQL Connected ...")};
})
// FIN CONNECTION MySQL

// BODYPARSER
app.use(bodyParser.json()); // Rend le corps de la requête exploitable facilement
// FIN BODYPARSER

app.use(expressSanitizer()); // Protège contre les failles XSS

// ROUTES
app.use("/images", express.static(path.join(__dirname, "images")));
// Va servir les routes dédiées aux utilisateurs
app.use("/api/user", userRoutes);
// Va servir les routes dédiées aux posts
app.use("/api/post", postRoutes);
// FIN ROUTES

// Export de l'application express pour déclaration dans server.js
module.exports = db;
module.exports = app;
