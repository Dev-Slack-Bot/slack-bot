const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
<<<<<<< HEAD
=======
// const appGLOBAL = require('./app.js');
>>>>>>> 6d820b29eaab8e29931da5b4d8d62e812be271cb

describe('slack-bot routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should get a random funny entree with /GET', async () => {
    return await request(app)
      .get('/api/v1/funnys')
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          entree: expect.any(String),
          course_id: expect.any(String),
          times_viewed: expect.any(Number),
<<<<<<< HEAD
        });
=======
        }); 
>>>>>>> 6d820b29eaab8e29931da5b4d8d62e812be271cb
      });
  });

  afterAll(() => {
    pool.end();
  });
});
