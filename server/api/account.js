const express = require('express');
const app = express.Router();
const { User } = require('../db');

app.post('/create', async (req, res, next)=>{
  try{
    const newUser = await User.create(req.body);
    res.sendStatus(200);
  } catch (error) {
    if(error.name === 'SequelizeUniqueConstraintError'){
      res.status(403);
      res.send(error.errors[0].message);
    }else{
      next(error);
    }
  }
})

module.exports = app;