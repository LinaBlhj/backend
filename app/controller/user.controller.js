const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/tutorial.user.js'); // Assurez-vous d'avoir correctement importé le modèle Sequelize

//requiered definitions for database
const db = require("../models");
const userDB = db.utilisateur;
const Op = db.Sequelize.Op;

exports.signup = (req, res, next) => {
//console.log(req.body.password)

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

//User//
//creation
exports.creation =  (req, res, next) => {
  console.log(req)
       userDB.create({
        prenom: req.body.prenom,
        nom: req.body.nom,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        jobSector: req.body.jobSector,
        jobType: req.body.jobType,
        Hours: req.body.Hours,
        Day: req.body.Day,
        Week: req.body.Week,
        Shift: req.body.Shift,
        Extra: req.body.Extra
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
}
    

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
