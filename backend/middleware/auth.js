const jwt = require("jsonwebtoken"); // Crée et check un token d'identification sécurisé
const env = require('../environment'); // Récupèere les variables d'environnement 
// FIN MODULES

// MIDDLEWARE AUTH
module.exports = (req, res, next) => { // Vérifie si le token est bon
    try { // Vérifie si le token est bon grâce à notre phrase secrète
        const token = req.headers.authorization.split(" ")[1]; // Récupére le token dans l'entête
        const decodedToken = jwt.verify(token, env.token); // On vérifie le token avec la clé pour le lire
        res.locals.userID = decodedToken.userID; // Le token devient un objet JS classique qu'on place dans une constante, et on y récupère l'user ID pour comparaison
        next();
    } catch{ // probleme d'autentification si erreur dans les inscrutions on renvoie le statut 401 non autorisé
        res.status(401).json({message: 'Requête non authentifiée !'});
    }
};