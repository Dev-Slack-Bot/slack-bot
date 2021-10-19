const { Router } = require('express');
const TipClass = require('../models/Tip.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const tip = await TipClass.getTip();
      res.send(tip);
    //math.random-floor
    } catch (error) {
      next(error);
    }
  });
