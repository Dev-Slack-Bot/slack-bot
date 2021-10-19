const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app');

describe('slack-bot tip routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.only('should get a random tip with /GET', async () => {
    return await request(app)
      .get('/api/v1/tips')
      .then((res) => {
        expect(res.body).toEqual({
          tip: expect.any(String),
          tipUrl: expect.any(String),
          course: expect.any(String),
          timesViewed: expect.any(Number),
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
