const { Router } = require('express');
const Funny = require('../models/Funny');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const seededFunnyData = await Funny.getData();
    res.send(seededFunnyData);
  } catch (error) {
    next(error);
  }
});
