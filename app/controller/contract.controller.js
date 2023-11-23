const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const fs = require('fs');
//const signPdf = require('node-signpdf');
//const { PDFDocument } = require('pdf-lib');


//requiered definitions for database
const db = require("../models");
const jobDB = db.job;
const Op = db.Sequelize.Op;
const Job = require('../models/tutorial.job.js');

exports.create = (req, res) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('output.pdf'));

  doc.font('Times-Roman')
    .fontSize(12)
    .text(`Job Contract`, { align: 'center' })
    .moveDown()
    .text(`This job contract is made and entered into on ${new Date().toLocaleDateString()}.`, { align: 'justify' })
    .moveDown()
    .text(`Between the employer and the employee, the following terms and conditions are agreed upon:`, { align: 'justify' })
    .moveDown()
    .text(`1. Position:`, { align: 'justify' })
    .moveDown()
    .text(`2. Salary:`, { align: 'justify' })
    .moveDown()
    .text(`3. Working hours:`, { align: 'justify' })
    .moveDown()
    .text(`4. Benefits:`, { align: 'justify' })
    .moveDown()
    .text(`5. Termination:`, { align: 'justify' })
    .moveDown()
    .text(`6. Confidentiality:`, { align: 'justify' })
    .moveDown()
    .text(`7. Governing law:`, { align: 'justify' })
    .moveDown()
    .text(`8. Entire agreement:`, { align: 'justify' })
    .moveDown()
    .text(`Signed: ___________________________`, { align: 'justify' });
  doc.end();

  res.send('PDF generated!');
}
    

