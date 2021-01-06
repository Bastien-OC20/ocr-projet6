const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const dotenv =require ( 'dotenv' ) . config ( )

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://'+process.env.DB_LOGIN+':'+process.env.DB_PASS+'@cluster0.nfr4e.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.use(bodyParser.json());
  app.use('/api/auth', userRoutes);
  app.use('/api/sauces',sauceRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;