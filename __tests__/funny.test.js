const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

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
          courseId: expect.any(String),
          timesViewed: expect.any(Number),
        });
      });
  });

  it('should get a funny quote by id', async () => {
    return await request(app)
      .get('/api/v1/funnys/1')
      .then((res) => {
        expect(res.body).toEqual({
          entree: 'It is looking like you might need a HARD refresh',
          course: 'Foundations_2',
          timesViewed: 0,
        });
      });
  });

  it('should update the times viewed on a funny quote', async () => {
    const views = await request(app).get('/api/v1/funnys/1');
    const incrimentViews = views.body.timesViewed + 1;
    return await request(app)
      .patch('/api/v1/funnys/1')
      .send({ id: 1, timesViewed: incrimentViews })
      .then((res) => {
        expect(res.body).toEqual({
          entree: expect.any(String),
          courseId: expect.any(String),
          timesViewed: 1,
        });
      });
  });

  it('should get a funny quote by id', async () => {
    return await request(app)
      .get('/api/v1/funnys/1')
      .then((res) => {
        expect(res.body).toEqual({
          entree: 'It is looking like you might need a HARD refresh',
          course: 'Foundations_2',
          timesViewed: 0,
        });
      });
  });

  it('should update the times viewed on a funny quote', async () => {
    const views = await request(app).get('/api/v1/funnys/1');
    const incrimentViews = views.body.timesViewed + 1;
    return await request(app)
      .patch('/api/v1/funnys/1')
      .send({ id: 1, timesViewed: incrimentViews })
      .then((res) => {
        expect(res.body).toEqual({
          entree: expect.any(String),
          courseId: expect.any(String),
          timesViewed: 1,
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
