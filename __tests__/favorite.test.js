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

  it('should get all favorites by userId', async () => {
    await request(app).post('/api/v1/users').send(newUser);
    await request(app).post('/api/v1/favorites').send(firstFavorite);
    await request(app).post('/api/v1/favorites').send(secondFavorite);
    await request(app).post('/api/v1/favorites').send(thirdFavorite);
    return await request(app)
      .get('/api/v1/favorites/newUser4321')
      .then((res) => {
        expect(res.body).toEqual([
          { ...firstFavorite, id: expect.any(String) },
          { ...secondFavorite, id: expect.any(String) },
          { ...thirdFavorite, id: expect.any(String) },
        ]);
      });
  });

  it('should delete favorites by favId', async () => {
    await request(app).post('/api/v1/users').send(newUser);
    await request(app).post('/api/v1/favorites').send(firstFavorite);
    await request(app).post('/api/v1/favorites').send(secondFavorite);
    await request(app).post('/api/v1/favorites').send(thirdFavorite);
    return await request(app)
      .delete('/api/v1/favorites/9')
      .then((res) => {
        expect(res.body).toEqual({ ...secondFavorite, id: expect.any(String) });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
