const request = require('supertest');
const express = require('express');
const { router: authRouter } = require('../routes/auth');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({ username: 'test', password: 'pass', role: 'user' });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
  });

  it('should not register duplicate username', async () => {
    await request(app).post('/api/auth/register').send({ username: 'dupe', password: '123', role: 'user' });
    const res = await request(app).post('/api/auth/register').send({ username: 'dupe', password: '123', role: 'user' });
    expect(res.statusCode).toBe(409);
  });
});
