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
  });
