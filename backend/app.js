// MODULES
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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

// HELMET
app.use(helmet()); // Protège l'app en paramétrant des Headers (notamment contre les failles XSS)
// FIN HELMET

app.use(cors());

/*// connection MySQL DATABASE 
exports.connection = mysql.createPool({
  host: 'localhost',
  user: 'NicolaAdmin',
  password: 'IlmioaccountMySQL!!97',
  database: 'groupmania_db',
  charset: 'utf8mb4',
  timezone: 'local'
}).then(() => console.log('Connexion à  réussie !'))
.catch(() => console.log('Connexion à échouée !'));
// FIN CONNECTION MySQL*/

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

module.exports = app;
