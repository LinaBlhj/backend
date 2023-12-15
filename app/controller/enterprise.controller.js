const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/tutorial.user.js'); // Assurez-vous d'avoir correctement importé le modèle Sequelize
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
var nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
//requiered definitions for database
const db = require("../models");
const enterpriseDB = db.entreprise;
const jobDB = db.job;
const Op = db.Sequelize.Op;
let verificationCode=0;
//Enterprise//
//creation
exports.create =  (req, res, next) => 
{
  console.log(req.body)

  if(req.body.type=="entreprise"){
  enterpriseDB.create({
    enterpriseName: req.body.enterpriseName,
    enterpriseRepresentative: req.body.enterpriseRepresentative,
    phoneNumber: req.body.phoneNumber,
    location: req.body.location,
    website: req.body.website,
    sector: req.body.sector
    }).then(data => {
      console.log(data)
      req.body.enterpriseid=data.id
      next();
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
  }
  else if (!req.body.type) {
    res.status(500).json({
      message:
        "Type was not defined."
    });
  }
  else {
    next();
  }
  
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
  userDB.findByPk(userId)
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
  userDB.findOne({ where: { email: req.body.email } })
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

exports.associate  =async (req, res, next) => {
  try {
  const user =await userDB.findByPk(req.body.userID);
  
  /*userDB.create({
    UtilisateurID: req.body.userID,
    JobID: req.body.JobID
  })*/
  const job =await jobDB.findByPk(req.body.jobID)
  console.log(job);
  user.addJob(job);
  next();
}
catch (error) {
  console.error(error);
  res.status(500).send('Cannot associate a user to a job');
}

  };


exports.requestPasswordReset = (req, res, next) => {
  const user = userDB.findOne({ where: { email: req.body.email } }).then(user => {
    if (!user) res.status(500).send('Utilisateur non trouvé');
    console.log("email trouvé: ",user.email)
    verificationCode = Math.floor(Math.random()*(9999 - 1000) + 1000)
    //const hash = bcrypt.hash(verificationCode, 10);

    console.log(verificationCode)
    sendEmail(user.email,"Password Reset Request",
      {
        name: user.nom,
        code: verificationCode,
      },
      "./template/requestResetPassword.handlebars",(err, data) => {
      if (err){
          console.log(err)
          res.sendStatus(500)
      }
      else{
          console.log(`success`)
          res.sendStatus(200)
         }
  })
    
  })

};

exports.resetPassword = async (req, res, next) => {
  /*let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }*/
  let userCode=req.body.userCode
  let password=req.body.password
  let userId=req.body.userId
  console.log(verificationCode, " ", userCode)
  if(verificationCode!=userCode) {
    console.log(`Code invalide`)
    res.sendStatus(200)
  }
  bcrypt.hash(password, 10).then(hash => {
    userDB.update({ password: hash }, { where: { id: userId } });
  })

  userDB.findByPk(userId).then(user => {
      sendEmail(
        user.email,
        "Password Reset Successfully",
        {
          name: user.nom,
        },
        "./template/resetPassword.handlebars",(err, data) => {
          if (err){
              console.log(err)
              res.sendStatus(500)
          }
          else{
              console.log(`success`)
              res.sendStatus(200)
            }
      }
      );

  })

  //await passwordResetToken.deleteOne();
  return true;
};