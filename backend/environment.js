// MODULES
 require("dotenv").config();
// FIN MODULES


module.exports = {
  token: process.env.TOKEN,
 DB_USERNAME: process.env.DB_ID,
 DB_PASSWORD: process.env.DB_PW,
 DB_DATABASE: process.env.DB_N
};

