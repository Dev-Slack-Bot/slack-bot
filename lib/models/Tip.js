const pool = require('../utils/pool.js');

module.exports = class TipClass {
    id;
    tip;
    tipUrl;
    courseId;
    course;
    timesViewed;

    constructor(row) {
      this.id = row.id;
      this.tip = row.tip;
      this.tipUrl  = row.tip_url;
      this.courseId  = row.course_id;
      this.course = row.course;
      this.timesViewed  = row.times_viewed;
    }

    static async getTip() {
      const { rows } = await pool.query('SELECT tip, tip_url, course.course, times_viewed FROM tips LEFT JOIN course ON tips.course_id = course.id');
      const randomTip = Math.floor(Math.random() * rows.length);
      return new TipClass(rows[randomTip]);                     
    }

    static async mostViewedTips() {
      const { rows } = await pool.query('SELECT tip, tip_url, course.course, times_viewed FROM tips LEFT JOIN course ON tips.course_id = course.id ORDER BY times_viewed DESC');
      return rows.map((row) => new TipClass(row));
    }

    static async updateViews({ id, timesViewed }) {
      const { rows } = await pool.query('UPDATE tips SET times_viewed = $2 WHERE tips.id = $1 RETURNING tip, tip_url, course_id, times_viewed', [id, timesViewed]);
      return new TipClass(rows[0]);
    }

};

