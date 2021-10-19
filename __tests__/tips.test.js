const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app');

describe('slack-bot tip routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should get a random tip with /GET', async () => {
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
  expect.extend({
    toBeNullOrString(received) {
      if (received === String) {
        return {
          pass: true
        };
      }else if (received === null) {
        return {
          pass: true
        };
      } else {
        return {
          pass: false,
        };
      }
    }
  }),

  it('should get a top 10 most viewed tips with /GET', async () => {
    return await request(app)
      .get('/api/v1/tips/toptips')
      .then((res) => {
        expect(res.body).toEqual([{
          tip: expect.any(String),
          tipUrl: expect.any(String),
          course: expect.any(String),
          timesViewed: expect.any(Number),
        }, {
          tip: expect.any(String),
          tipUrl: expect.any(String),
          course: expect.any(String),
          timesViewed: expect.any(Number),
        }, {
          tip: expect.any(String),
          tipUrl: expect.any(String),
          course: expect.any(String),
          timesViewed: expect.any(Number),
        }, {
          tip: expect.any(String),
          tipUrl: expect.any(String),
          course: expect.any(String),
          timesViewed: expect.any(Number),
        }, {
          tip: expect.any(String),
          tipUrl: expect.any(String),
          course: expect.any(String),
          timesViewed: expect.any(Number),
        }, {
          tip: expect.any(String),
          tipUrl: expect.toBeNullOrString(),
          course: expect.any(String),
          timesViewed: expect.any(Number),
        }]);
      });
  });

  afterAll(() => {
    pool.end();
  });
});
