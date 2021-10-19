const { Router } = require('express');
const User = require('../models/User');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const userData = await User.postUser(req.body);
    res.send(userData);
  } catch (error) {
    next(error);
  }
});
