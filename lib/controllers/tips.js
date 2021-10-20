const { Router } = require('express');
const TipClass = require('../models/Tip.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const tip = await TipClass.getTip();
      res.send(tip);
    } catch (error) {
      next(error);
    }
  })
  .get('/toptips', async (req, res, next) => {
    try {
      const tips = await TipClass.mostViewedTips();
      res.send(tips);
    }catch(err){
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try{
      const id = req.params.id;
      const tip = await TipClass.getTipById(id);
      res.send(tip);
    }catch(err){
      next(err);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const views = await TipClass.updateViews(req.body);
      console.log(req.body, 'REQBODY');
      res.send(views);
    }catch(err){
      next(err);
    }
  });
