const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/tutorial.user.js'); // Assurez-vous d'avoir correctement importé le modèle Sequelize

exports.signup = (req, res, next) => {
console.log(req.body.password)

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      Utilisateur.create({
        email: "email@email.fr",
        password: "mdp"
      })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.test  = (req, res, next) => {
  res.send({"test": "test"})
  };
exports.testPost  = (req, res, next) => {
  console.log(req)
  };
    

exports.login = (req, res, next) => {
  Utilisateur.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
