const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('slack-bot tip routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should get a random tip with /GET', async () => {
    return await request(app)
      .get('/api/v1/tips')
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          tip: expect.any(String),
          tipUrl: expect.any(String),
          courseId: expect.any(String),
          timesViewed: expect.any(Number),
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
