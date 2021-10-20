const { Router } = require('express');
const User = require('../models/User');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const userData = await User.postUser(req.body);
    res.send(userData);
  } catch (error) {
    next(error);
  }
})

  .get('/:id', async (req, res, next) => {
    try{
      const id = req.params.id;
      const idObj = await User.findById(id);
      res.send(idObj);
    }catch(err){
      next(err);
    }
  });


