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
      .then((res) => {expect(res.body).toEqual(expect.any(Array));
        // expect(res.body).toEqual([
        //   {
        //     id: null,
        //     userId: 'newUser4321',
        //     tipsId: '1',
        //     funnyId: null,
        //     tip: 'For help pracicing CSS flex, try Flexboxfroggy!',
        //     tipUrl: 'https://flexboxfroggy.com/',
        //     courseId: null,
        //     timesViewed: null,
        //     entree: null,
        //   },
        //   {
        //     id: null,
        //     userId: 'newUser4321',
        //     tipsId: '2',
        //     funnyId: null,
        //     tip: 'Starting a new HTML doc? Try using html:5 at the start. Here is the Vscode link for html',
        //     tipUrl: 'https://code.visualstudio.com/docs/languages/html',
        //     courseId: null,
        //     timesViewed: null,
        //     entree: null,
        //   },
        //   {
        //     id: '3',
        //     userId: 'newUser4321',
        //     tipsId: null,
        //     funnyId: '3',
        //     tip: null,
        //     tipUrl: null,
        //     courseId: '3',
        //     timesViewed: 0,
        //     entree:
        //       'remember that one time Dan was a on a "roll" in the Role Model........',
        //   },
        // ]);
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
