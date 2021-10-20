const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
const newUser = require('../lib/utils/user-utils');

describe('slack-bot routes', () => {
  beforeEach(() => {
    return setup(pool); 
  });

  it('should post a user', async () => {
    return await request(app)
      .post('/api/v1/users')
      .send(newUser)
      .then((res) => {
        expect(res.body).toEqual({
          id: 'newUser4321',
          username: 'newbie',
          name: 'newGuy',
        });
      });
  });

  it.skip('should find a user by id', async () => {
    await request(app).post('/api/v1/users').send(newUser);
    return request(app)
      .get('/api/v1/users/newUser4321')
      .then((res) => {
        expect(res.body).toEqual({
          id: 'newUser4321',
          username: 'newbie',
          name: 'newGuy',
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
