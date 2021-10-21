const { Router } = require('express');
const Favorite = require('../models/Favorite');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const favoriteData = await Favorite.postFavorite(req.body);
      res.send(favoriteData);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const favoriteData = await Favorite.getFavByUserId(id);
      res.send(favoriteData);
    } catch (error) {
      next(error);
    }
  });
