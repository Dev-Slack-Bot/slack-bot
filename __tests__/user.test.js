const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('slack-bot routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should post a user', async () => {
    return await request(app)
      .post('/api/v1/users')
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          username: expect.any(String),
          name: expect.any(String),
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
