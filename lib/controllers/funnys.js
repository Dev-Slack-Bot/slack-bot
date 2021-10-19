const { Router } = require('express');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    //math.random-floor
  } catch (error) {
    next(error);
  }
});
