const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/tutorial.user.js'); // Assurez-vous d'avoir correctement importé le modèle Sequelize
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
var nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
//requiered definitions for database
const db = require("../models");
const loginDB = db.login;
const jobDB = db.job;
const Op = db.Sequelize.Op;
let verificationCode=0;
const userCtrl = require('./user.controller.js');
//Login//
//creation
exports.create =  (req, res, next) => {
  console.log(req.body)
  let uId = null;
  let eId = null;
  if(req.body.type=="user") {
    uId=req.body.userid
  }
  else if(req.body.type=="entreprise") {
    eId=req.body.enterpriseid
  }
  bcrypt.hash(req.body.password, 10).then(hash => {
    console.log('hash ok')
       loginDB.create({
        email: req.body.email,
        password: hash,
        UtilisateurId: uId,
        EntrepriseId: eId
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
  })
}
// Update a User by the id in the request
exports.update = (req, res, next) => {
  let id=req.auth.userId;
  console.log(id)
  
  /*try {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken)
    id = decodedToken.userId;

    console.log(userId);
  } catch (error) {
    res.status(401).json({ error: 'Token invalid' });
  }*/

  userDB.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err+"Error updating Tutorial with id=" + id
      });
    });
};


// Find a single Tutorial with an id
exports.findOne = (req, res, next) => {
  /*const id = req.params.id;
  console.log(req.params)*/
  let userId=req.auth.userId;
  /*try {
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    console.log(token)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    console.log(decodedToken)
    userId = decodedToken.userId;

    console.log(userId);
  } catch (error) {
    res.status(401).json({ error: 'Token invalid' });
  }*/
  loginDB.findByPk(userId)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });

};

exports.login = (req, res, next) => {
  loginDB.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }

          const id = user.UtilisateurId == null ? user.EntrepriseId : user.UtilisateurId;
          const type = user.UtilisateurId == null ? "entreprise" : "user";

          // Stockez l'ID et le type dans la session
          req.session.regenerate(function (err) {
            if (err) next(err)
        
          req.session.userId = id;
          req.session.userType = type;

          console.log('Session créée avec userId:', req.session);
          req.session.save(function (err) {
            if (err) return err
          });
          res.status(200).json({
            userId: id,
            userType: type,
            message: 'Connecté avec succès'
          });
        })
      })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
  try {
    // Détruisez la session
    req.session.destroy();
    res.send('Déconnecté avec succès');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la déconnexion' });
  }
};