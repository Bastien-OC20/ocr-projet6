// app.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // transformation du corps des requetes en objet JS utilisable
const path = require('path'); // Access au chemin des fichiers



const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

require('dotenv').config()

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://'+process.env.DB_LOGIN+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+'/'+process.env.DB_NAME+'?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


 
// Evite les ERRORS de CORS, pour que tout le monde puisse faire des requete depuis son navigateur 
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // droit ouvert à tout le monde pour accéder à l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Autorisation d'utiliser certaines entetes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Methode utilisée
    next();
  });


  app.use(bodyParser.json());
  app.use('/api/auth', userRoutes);
  app.use('/api/sauces',sauceRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;