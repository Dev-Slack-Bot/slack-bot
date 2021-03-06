const { Router } = require('express');
const Funny = require('../models/Funny');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const seededFunnyData = await Funny.getData();
      res.send(seededFunnyData);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const id = req.params.id;
      const quote = await Funny.getDataById(id);
      res.send(quote);
    }catch(err){
      next(err);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try{
      const id = req.params.id;
      const quoteUpdate = await Funny.updateViewsById(id, req.body);
      res.send(quoteUpdate);
    }catch(err){
      next(err);
    }
  });
