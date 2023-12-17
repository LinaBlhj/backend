const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const cors = require('cors');
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.json());
const stuffRoutes = require('./app/routes/stuff.js');
const userRoutes = require('./app/routes/user.js');
const loginRoutes = require('./app/routes/login.js');
const enterpriseRoutes = require('./app/routes/enterprise.js');
const jobRoutes = require('./app/routes/job.js');
const contractRoutes = require('./app/routes/contract.js');
const oneDay = 1000 * 60 * 60 * 24;

// Configuration de la session
app.use(session({
  secret: 'votre_secret_key',
  resave: true,
  saveUninitialized: true,
  cookie: {}
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/user', userRoutes);
app.use('/api/enterprise', enterpriseRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/contract', contractRoutes);

//app.use('/api/appli', appliRoutes);
  
module.exports = app;