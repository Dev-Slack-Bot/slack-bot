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
      const favoriteData = await Favorite.getFavByUserId(req.params.id);
      res.send(favoriteData);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const favoriteData = await Favorite.deleteFavByFavId(req.params.id);
      res.send(favoriteData);
    } catch (error) {
      next(error);
    }
  });
