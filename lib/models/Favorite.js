const pool = require('../utils/pool');

module.exports = class Favorite {
  id;
  user_id;
  tips_id;
  funny_id;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.tips_id = row.tips_id;
    this.funny_id = row.funny_id;
  }

  static async postFavorite({ user_id, tips_id, funny_id }) {
    const { rows } = await pool.query(
      ' INSERT INTO favorite( user_id, tips_id, funny_id) VALUES ($1, $2, $3) RETURNING *;',
      [user_id, tips_id, funny_id]
    );

    return new Favorite(rows[0]);
  }
};
