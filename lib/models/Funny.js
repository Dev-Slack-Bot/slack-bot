const pool = require('../utils/pool');

module.exports = class Funny {
  id;
  entree;
  courseId;
  course;
  timesViewed;

  constructor(row) {
    this.id = row.id;
    this.entree = row.entree;
    this.courseId = row.course_id;
    this.course = row.course;
    this.timesViewed = row.times_viewed;
  }

  static async getData() {
    const { rows } = await pool.query('SELECT * FROM funny');
    const randomEntree = Math.floor(Math.random() * rows.length);
    return new Funny(rows[randomEntree]);
  }

  static async getDataById(id) {
    const { rows } = await pool.query('SELECT entree, course, times_viewed FROM funny LEFT JOIN course ON funny.course_id = course.id WHERE funny.id = $1', [id]);
    return new Funny(rows[0]);
  }
};
