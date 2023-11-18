const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//requiered definitions for database
const db = require("../models");
const jobDB = db.job;
const Op = db.Sequelize.Op;
const Job = require('../models/tutorial.job.js');

//Job//
//creation
exports.create =  (req, res, next) => {
  console.log(req.body)
       jobDB.create({
        PositionName: req.body.PositionName,
        Location: req.body.Location,
        BeginningDate: req.body.BeginningDate,
        JobType: req.body.JobType,
        JobSector: req.body.JobSector,
        Pay: req.body.Pay,
        Compensation: req.body.Compensation,
        Benefit: req.body.Benefit,
        CandidateRequiered: req.body.CandidateRequiered,
        DateRequiered: req.body.DateRequiered,
        Hours: req.body.Hours,
        Day: req.body.Day,
        Week: req.body.Week,
        Shift: req.body.Shift,
        Extra: req.body.Extra,
        JobDescription: req.body.JobDescription
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
    

