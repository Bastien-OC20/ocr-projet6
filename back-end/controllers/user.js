const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require ( 'dotenv' ) . config ( )

const User = require('../models/User');


const sanitize = require('mongo-sanitize')




exports.signup = (req, res, next) => {
  let email=sanitize(req.body.email);
  let password=sanitize(req.body.password);
  try {
    let regex=/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password);
    if(regex){
      bcrypt.hash(password, 10)
      .then(hash => {
        const user = new User({
          email: email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(503).json({ error }));
    }else{
      throw error = new Error('le mot de passe doit contenir au moins 8 caractère , une minuscule ,une majuscule et un chifre ou un caractère spécial');
  } 
    
  } catch (error) {
     res.status(400).json({error})
  }
    
  };




  exports.login = (req, res, next) => {
    let email=sanitize(req.body.email);
    let password=sanitize(req.body.password);
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error });
        }
        bcrypt.compare(password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error});
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN,
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };