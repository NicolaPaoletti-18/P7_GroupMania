// MODULES - Routeur Express
const express = require("express");
// Appel du routeur avec la méthode mise à disposition par Express
const router = express.Router();
// FIN MODULES

// IMPORTATION USER CONTROLLERS - Importe le controller
const userCtrl = require("../controllers/user");
// FIN IMPORTATION

// IMPORTATION MIDDLEWARES
const auth = require("../middleware/auth"); // Crée un token d'identification
const multer = require("../middleware/multer-config"); // Permet d'envoyer un fichier dans la requête
// FIN IMPORTATION

// ROUTE
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", auth, userCtrl.Logout);
router.delete("/delete", auth, userCtrl.delete);
router.get("/:id/profile", auth, userCtrl.profile);
router.get("/role", userCtrl.role);
router.put("/modify", auth, multer, userCtrl.modify);
// ROUTE

module.exports = router;