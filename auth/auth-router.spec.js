const db = require('../data/dbConfig');
const request = require('supertest');
const server = require('../api/server')


describe('auth-router.js', () => {
    beforeEach(async () => {
      await db('auth').truncate();
    });
    
describe('POST to /api/auth/register', () => {
    it('responds with 500 OK', async done => {
      await request(server)
        .post('/api/auth/register')
        .send({ username: 'hahahahaha', password: 'hahahahaha', email: 'event@gmail.com'})
        .expect(200);

      done();
    });

    it('responds with JSON', async done => {
      await request(server)
        .post('/api/auth/register')
        .send({ username: 'test', password: 'test', email: 'vendor@gmail.com' })
        .expect('Content-Type', /json/i);

      done();
    });
  });

describe('POST  to /api/auth/login', () => {
    it('responds with 200 OK', async done => {
      await request(server)
        request(server)
        .post('/api/auth/login')
        .send({ username: 'TakeTest', password: 'MakeTest', email: 'test@gmail.com' })
        .expect(200);

      done();
    });

    it('responds with JSON', async done => {
      await request(server)
         request(server)
        .post('/api/auth/login')
        .send({ username: 'Muamer', password: 'Kukic', email: 'kukic@gmail.com' })
        .expect('Content-Type', /json/i);

      done();
    });
  });
});
