// Tests for auth endpoints
const request = require('supertest');
const app = require('../index');
const User = require('../models/User');

describe('Auth Endpoints', () => {
  const testUser = { name: 'Test User', email: 'authtest@example.com', password: 'testpass', role: 'patient' };

  beforeAll(async () => {
    await User.deleteMany({ email: testUser.email });
  });

  afterAll(async () => {
    await User.deleteMany({ email: testUser.email });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toMatch(/registered/i);
  });

  it('should not register duplicate user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toMatch(/already exists/i);
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'wrongpass' });
    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toMatch(/invalid/i);
  });
});
