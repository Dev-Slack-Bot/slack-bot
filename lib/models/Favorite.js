const pool = require('../utils/pool');

module.exports = class Favorite {
  id;
  userId;
  tipsId;
  funnyId;
  entree;
  courseId;
  timesViewed;
  tip;
  tipUrl;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.tipsId = row.tips_id;
    this.funnyId = row.funny_id;
    this.entree = row.entree;
    this.courseId = row.course_id;
    this.timesViewed = row.times_viewed;
    this.tip = row.tip;
    this.tipUrl = row.tip_url;
  }

  static async postFavorite({ userId, tipsId, funnyId }) {
    const { rows } = await pool.query(
      ' INSERT INTO favorite( user_id, tips_id, funny_id) VALUES ($1, $2, $3) RETURNING *;',
      [userId, tipsId, funnyId]
    );
    return new Favorite(rows[0]);
  }

  // favorite.id, favorite.user_id, favorite.tips_id, favorite.funny_id, funny.entree, tips.tip
  static async getFavByUserId(id) {
    const { rows } = await pool.query(
      `
    SELECT *
    FROM favorite 
    LEFT JOIN tips 
    ON favorite.tips_id = tips.id 
    LEFT JOIN funny 
    ON favorite.funny_id = funny.id
    WHERE user_id= $1`,
      [id]
    );
    console.log('rows', rows);
    // return rows; //works and renders what we want expect for test--its col names
    // return new Favorite(rows[0]); //works and renders what we want expect for test--only a single row
    return rows.map((row) => new Favorite(row)); //tests pass and works with return everything from rows
  }

  static async deleteFavByFavId(id) {
    const { rows } = await pool.query(
      'DELETE FROM favorite WHERE id= $1 RETURNING *',
      [id]
    );

    return new Favorite(rows[0]);
  }
};
