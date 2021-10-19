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

};

