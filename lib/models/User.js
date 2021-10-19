const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;
  name;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.name = row.name;
  }

  static async postUser({ id, username, name }) {
    const { rows } = await pool.query(
      ' INSERT INTO users( id, username, name) VALUES ($1, $2, $3) RETURNING *;',
      [id, username, name]
    );

    return new User(rows[0]);
  }
};
