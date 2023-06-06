const express = require('express');
const app = express.Router();
const { User } = require('../db');

app.post('/create', async (req, res, next)=>{
  try{
    console.log(req.body);
    const newUser = User.create(req.body);
  }catch(error){
    next(error)
  }
})

module.exports = app;