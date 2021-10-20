const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const newUser = require('../lib/utils/user-utils');
const selectedFavorite = require('../lib/utils/favorite-utils');

describe('slack-bot routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should post a new favorite to userId after selected', async () => {
    await request(app).post('/api/v1/users').send(newUser);
    return await request(app)
      .post('/api/v1/favorites')
      .send(selectedFavorite)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          user_id: 'newUser4321',
          tips_id: '1',
          funny_id: null,
        });
      });
  });

  //getAllFavsById

  //delete

  afterAll(() => {
    pool.end();
  });
});
