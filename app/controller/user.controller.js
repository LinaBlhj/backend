const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/tutorial.user.js'); // Assurez-vous d'avoir correctement importé le modèle Sequelize
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
var nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
//requiered definitions for database
const db = require("../models");
const userDB = db.utilisateur;
const jobDB = db.job;
const Op = db.Sequelize.Op;
let verificationCode=0;
//User//
//creation
exports.create =  (req, res, next) => {
  console.log(req.body)
  bcrypt.hash(req.body.password, 10).then(hash => {
    console.log('hash ok')
       userDB.create({
        prenom: req.body.firstName,
        nom: req.body.lastName,
        dateOfBirth: req.body.dateB,
        email: req.body.email,
        password: hash,
        phoneNumber: req.body.phone,
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
  })
}
    
// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

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
        message: "Error updating Tutorial with id=" + id
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
  res.status(500).send('Internal Server Error');
}

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
  res.status(500).send('Internal Server Error');
}

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
  res.status(500).send('Internal Server Error');
}

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
  res.status(500).send('Internal Server Error');
}

  };


exports.requestPasswordReset = (req, res, next) => {
  const user = userDB.findOne({ where: { email: req.body.email } }).then(user => {
    if (!user) throw ("Email does not exist");
    console.log("email trouvé: ",user.email)
    verificationCode = Math.floor(Math.random()*(999999 - 100000) + 100000)
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