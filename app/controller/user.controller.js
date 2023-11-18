const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/tutorial.user.js'); // Assurez-vous d'avoir correctement importé le modèle Sequelize
const sendEmail = require("../utils/email/sendEmail");
const crypto = require("crypto");
var nodemailer = require('nodemailer');
//requiered definitions for database
const db = require("../models");
const userDB = db.utilisateur;
const Op = db.Sequelize.Op;

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


exports.requestPasswordReset = (req, res, next) => {
  const user = userDB.findOne({ where: { email: req.body.email } });
  if (!user) throw new ("Email does not exist");
  console.log("email trouvé")
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = bcrypt.hash(resetToken, 10);
  const link = `localhost://3005//passwordReset?token=${resetToken}&id=${user._id}`;
  //const link = `localhost://3005/passwordReset?token=${resetToken}&id=id`;
  console.log("pre saveEmail")
  sendEmail(user.email,"Password Reset Request",
    {
      name: user.name,
      link: link,
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

};

exports.resetPassword = async (userId, token, password) => {
  /*let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }*/
  const hash = await bcrypt.hash(password, 10);
  await userDB.updateOne(
    { _id: userId },
    { $set: { password: hash } }
  );
  const user = await userDB.findById({ _id: userId });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );
  await passwordResetToken.deleteOne();
  return true;
};