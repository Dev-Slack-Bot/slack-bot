const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const newUser = require('../lib/utils/user-utils');
const firstFavorite = require('../lib/utils/favorite-utils');

describe('slack-bot routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const secondFavorite = {
    userId: 'newUser4321',
    tipsId: '2',
    funnyId: null,
  };

  const thirdFavorite = {
    userId: 'newUser4321',
    tipsId: null,
    funnyId: '3',
  };

  it('should post a new favorite to userId after selected', async () => {
    await request(app).post('/api/v1/users').send(newUser);
    return await request(app)
      .post('/api/v1/favorites')
      .send(firstFavorite)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          userId: 'newUser4321',
          tipsId: '1',
          funnyId: null,
        });
      });
  });

  //delete

  afterAll(() => {
    pool.end();
  });
});
