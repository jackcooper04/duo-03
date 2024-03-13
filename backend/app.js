//Import Packages
const express = require('express');
const fs = require('fs')
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios')
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Init DotENV
dotenv.config();

//Initalise App
const app = express();

mongoose
  .connect(process.env.URI, {
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err)
    console.log("Connection Failed");
  });


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type,Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,OPTIONS,PUT"
    );
    next();
});

//Initalise Morgan and BodyParser
app.use(morgan('dev'));
//app.use('/ypg9rka9AVP!kpk1jbt/managed-packs', express.static('managed-packs'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/ping', async (req, res, next) => {
    res.send(200);
});

module.exports = app;