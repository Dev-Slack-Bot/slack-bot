const { Router } = require('express');
import TipClass from '../models/Tip.js';

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
