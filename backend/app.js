//Import Packages
const express = require('express');
const fs = require('fs')
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios')
const mongoose = require('mongoose');
const scoreSchema = require('./models/score')
const dotenv = require('dotenv');
const score = require('./models/score');
const user = require('./models/user');


//Init DotENV
dotenv.config();

//Initalise App
const app = express();

mongoose
  .connect(process.env.URI, {
  })
  .then(() => {
    console.log("Connected to Database");
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


app.post('/add/hxv8HFX3hak-aep2pqh',async (req,res,next) => {
    var newScore = new score({
        user:req.body.user,
        score:req.body.score
    })
    newScore.save();
    res.sendStatus(200);
});

app.get("/user/hxv8HFX3hak-aep2pqh",async (req,res,next) => {
    var userID = Math.floor(Math.random()*(999-100+1)+100);
    var valid = false;
        var newUser = new user({
            number:userID,
            name:userID,
            shown:false
        })
        console.log(newUser)
        const saved = await newUser.save()
        res.json(saved)
    
 
   
})
app.get('/grabUserDetails/hxv8HFX3hak-aep2pqh', async (req,res,next) => {

    const foundUser = await user.findOne({_id:req.query.id});
    const foundScores = await score.find({user:req.query.id});
    const allScores = await score.find()
    .sort({score:-1})
    .populate({
        path:'user',
        match : {shown:true}
    })
    res.json({user:foundUser,scores:foundScores,allScores:allScores})
});

app.get('/makeUserPublic/hxv8HFX3hak-aep2pqh', async (req,res,next) => {

    const foundUser = await user.findOne({_id:req.query.id});
    foundUser.name = req.query.name;
    foundUser.shown = true;
    const updatedUser = await user.findOneAndUpdate({_id:req.query.id},foundUser)
    res.sendStatus(200);
});
app.get('/view/hxv8HFX3hak-aep2pqh', async (req,res,next) => {
    const scores = await score.find()
    .sort({score:-1})
    res.json(scores)
})


app.get('/ping', async (req, res, next) => {
  
    res.send(200);
});

module.exports = app;