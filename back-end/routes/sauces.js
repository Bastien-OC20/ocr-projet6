// On déclare notre framework Express
const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');



// La logique routes
router.post('/', sauceCtrl.createSauce);// Envoi des données
router.put('/:id', sauceCtrl.modifySauce);// Modification de l'id
router.delete('/:id', sauceCtrl.deleteSauce);// Suppression de l'id
router.get('/', sauceCtrl.getAllSauces);// Récupère tout les objets
router.get('/:id', sauceCtrl.getOneSauce);// Envoi de l'identifiant
router.post('/:id/like', sauceCtrl.likeSauce); // like / dislike les sauces

module.exports = router;