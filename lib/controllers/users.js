const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      let user = await User.findById(req.body.id);
      if(!user) {
        user = await User.postUser(req.body);
      }
      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const idObj = await User.findById(id);
      res.send(idObj);
    } catch (error) {
      next(error);
    }
  });
