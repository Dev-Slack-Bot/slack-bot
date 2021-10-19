const pool = require('../utils/pool');

module.exports = class Funny {
  id;
  entree;
  course_id;
  times_viewed;

  constructor(row) {
    this.id = row.id;
    this.entree = row.entree;
    this.course_id = row.course_id;
    this.times_viewed = row.times_viewed;
  }

  static async getData() {
    const { rows } = await pool.query(` SELECT * FROM funny* 
    `);
    return new Funny(rows);
  }
};
