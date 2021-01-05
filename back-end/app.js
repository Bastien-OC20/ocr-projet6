const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');


const sauceRoutes = require('./routes/sauces');

const dotenv =require ( 'dotenv' ) . config ( )
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
  app.use('/api/sauces',sauceRoutes)

module.exports = app;