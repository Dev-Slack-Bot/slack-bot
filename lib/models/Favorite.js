const pool = require('../utils/pool');

module.exports = class Favorite {
  id;
  userId;
  tipsId;
  funnyId;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.tipsId = row.tips_id;
    this.funnyId = row.funny_id;
  }

  static async postFavorite(userId, tipsId, funnyId) {
    const { rows } = await pool.query(
      ' INSERT INTO favorite( user_id, tips_id, funny_id) VALUES ($1, $2, $3) RETURNING *;',
      [userId, tipsId, funnyId]
    );

    return new Favorite(rows[0]);
  }
};
