const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  name;
  userId;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.name = row.name;
    this.userId = row.user_id;
  }

  static async postUser({ id, username, name }) {
    const { rows } = await pool.query(
      ' INSERT INTO users( id, username, name) VALUES ($1, $2, $3) RETURNING *;',
      [id, username, name]
    );

    return new User(rows[0]);
  }
  
  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT * FROM users WHERE id = $1`, 
    [id]);

    if (!rows[0]) return null;

    return new User(rows[0]);
  }
};
