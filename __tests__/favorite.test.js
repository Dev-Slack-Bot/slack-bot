const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('slack-bot routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should post a new favorite to userId after selected', async () => {
    return await request(app)
      .get('/api/v1/favorites')
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          user_id: expect.any(String),
          tips_id: expect.any(String) || null,
          course_id: expect.any(String) || null,
        });
      });
  });

  //getAllFavsById

  //delete

  afterAll(() => {
    pool.end();
  });
});
