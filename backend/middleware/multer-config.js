   
// MODULES
const multer = require('multer');
// FIN MODULES

// DICTIONNAIRE TYPE MIME
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif',
  'video/mp4': 'mp4'
};
// FIN DICTIONNAIRE

// FONCTION STORAGE
const storage = multer.diskStorage({ // Configure multer
  destination: (req, file, callback) => { // Indique où enregistrer les fichiers
    callback(null, 'images');
  },
  filename: (req, file, callback) => { // Indique le nom du fichier
    let name = file.originalname.split(' ').join('_'); // Pour éliminer les éventuelles espaces du nom d'origine
    let extension = MIME_TYPES[file.mimetype]; // Défini le type
    name = name.replace("." + extension, "_"); // création du nom final
    callback(null, name + Date.now() + '.' + extension); // Genère le nom complet du fichier- Nom d'origine + numero unique + . + extension
  }
});
// FIN FONCTION

// Export de l'élément multer, seuls les fichiers de type image seront gérés
module.exports = multer({
  storage: storage
}).single('image');