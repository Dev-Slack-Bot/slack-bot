import pool from '../utils/pool.js';

export default class TipClass {
    id;
    tip;
    tipUrl;
    courseId;
    timesViewed;

    constructor(row) {
      this.id = row.id;
      this.tip = row.tip;
      this.tipUrl  = row.tip_url;
      this.courseId  = row.course_id;
      this.timesViewed  = row.times_viewed;
    }

    static async getTip() {
      const { rows } = await pool.query('SELECT tip, tip_url, course FROM tips LEFT JOIN course ON tips.course_id = course.id');
      return new TipClass(rows[0]);                     
    }

}

