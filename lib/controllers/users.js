const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
<<<<<<< HEAD
      const userData = await User.postUser(req.body);
=======
      console.log(req.body, 'REQQQQ BODY');
      const userData = await User.postUser(req.body);

>>>>>>> 5295a50f452586eee3d539f6554885152b8013df
      res.send(userData);
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
