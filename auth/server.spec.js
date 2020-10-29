require('dotenv').config();
const server = require('../api/server');
const db = require('../auth/helper-model');
const knexDB = require('../database/dbConfig');
const authenticate = require('../auth/authenticate-middleware');
const request = require('supertest');

describe('GET/', () => {
  it('returns 200 ', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
  });

  it('returns a json object', async () => {
    const res = await request(server).get('/');
    expect(res.type).toBe('application/json');
  });
});

describe('POST/', () => {
  beforeEach(async () => {
    await knexDB('users').truncate();
  });

  it('returns 2 new users}', async () => {
    await db.add({ username: 'david', password: 'lol' });
    await db.add({ username: 'jackson', password: '123' });

    const users = await knexDB('users');
    expect(users).toHaveLength(2);
  });
  it('returns 200 ', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
  });
});
